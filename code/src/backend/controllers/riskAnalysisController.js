import { verifyOFAC } from '../clients/ofac.js';
import { parseCSV } from '../utils/parseCsv.js';
import { parsePdf } from '../utils/parsePdf.js';
import { parseText } from '../utils/parseText.js';
import { searchAndGetCompanyDetails } from '../services/companyDetailsService.js';
import { checkCountryFATFStatus } from '../clients/riskCountryFATF.js';
import { trainMLModel, predictRiskScore, callMLServiceHealthCheck } from '../services/mlService.js';
import { analyzeTransactionComprehensively } from '../services/integrationService.js';

const calculateRisk = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const fileBuffer = req.file.buffer;
        console.log(req.file);
        // Determine the file type
        const fileType = req.file.mimetype;

        if (!fileType) {
            return res.status(400).json({ success: false, message: 'Unable to determine file type.' });
        }

        // Classify the file
        let fileClassification;
        if (fileType === 'application/pdf') {
            fileClassification = 'PDF';
        } else if (
            fileType === 'text/csv' || // Standard CSV MIME type
            fileType === 'application/vnd.ms-excel' // Older CSV MIME type
        ) {
            fileClassification = 'CSV';
        } else if (
            fileType === 'text/plain' // Accepting plain text files
        ) {
            fileClassification = 'TEXT';
        } else {
            return res.status(400).json({ success: false, message: 'Unsupported file type. Only PDF, CSV, and TEXT files are allowed.' });
        }

        // Parse the file based on its type
        let parsedData;
        if (fileClassification === "CSV") {
            parsedData = await parseCSV(fileBuffer); // Parse CSV file
        } else if (fileClassification === "PDF") {
            parsedData = await parsePdf(fileBuffer); // Parse PDF file
        } else if (fileClassification === "TEXT") {
            parsedData = await parseText(fileBuffer); // Parse TEXT file
        }

        // Train the ML model first
        await trainMLModel();

        // Process each transaction with comprehensive analysis
        const enrichedData = await Promise.all(parsedData.map(async (transaction) => {
            const senderDetails = await searchAndGetCompanyDetails(transaction.sender);
            const receiverDetails = await searchAndGetCompanyDetails(transaction.receiver);

            // Perform OFAC verification for both sender and receiver
            const senderOFACVerification = await verifyOFAC(senderDetails.name);
            const receiverOFACVerification = await verifyOFAC(receiverDetails.name);
            
            // Get ML risk prediction
            const mlPrediction = await predictRiskScore({
                amount: transaction.amount,
                transactionType: transaction.transactionType,
                senderDetails: {
                    directMatchWithSDN: senderOFACVerification["SDN Sanction"],
                    terroristAffiliation: senderOFACVerification["Terrorist or Criminal Affliation"],
                    highRiskCountry: senderOFACVerification["High-Risk Countries"],
                    secondarySanctionsRisk: senderOFACVerification["Secondary Sanctions Risk"],
                    sectoralSanctions: senderOFACVerification["Sectoral Sanctions (SSI)"],
                    FATFListCountryStatus: await checkCountryFATFStatus(transaction.senderCountry),
                    antiMoneyLaundering: false
                },
                receiverDetails: {
                    directMatchWithSDN: receiverOFACVerification["SDN Sanction"],
                    terroristAffiliation: receiverOFACVerification["Terrorist or Criminal Affliation"],
                    highRiskCountry: receiverOFACVerification["High-Risk Countries"],
                    secondarySanctionsRisk: receiverOFACVerification["Secondary Sanctions Risk"],
                    sectoralSanctions: receiverOFACVerification["Sectoral Sanctions (SSI)"],
                    FATFListCountryStatus: await checkCountryFATFStatus(transaction.receiverCountry),
                    antiMoneyLaundering: false
                }
            });

            // Get comprehensive analysis combining ML and LLM results
            const comprehensiveAnalysis = await analyzeTransactionComprehensively(transaction, mlPrediction);
            
            return {
                detailedAnalysis: comprehensiveAnalysis.detailedAnalysis,
                combinedAnalysis: comprehensiveAnalysis.combinedAnalysis
            };
        }));

        // Separate detailed and summary analyses
        const detailedAnalyses = enrichedData.map(data => data.detailedAnalysis);
        const summaryAnalyses = enrichedData.map(data => data.combinedAnalysis);

        return res.json({
            success: true,
            message: "Risk calculated successfully",
            fileType: fileClassification,
            detailedAnalyses,
            summaryAnalyses
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

const healthCheck = async (req, res) => {
    try {
        const healthStatus = await callMLServiceHealthCheck();
        return res.json(healthStatus);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export default { calculateRisk, healthCheck };