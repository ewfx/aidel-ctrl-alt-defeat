import axios from 'axios';
import { OFAC_KEY, OFAC_SOURCES } from "../utils/constants.js";
import { getHighRiskCountries } from './riskCountryFATF.js';

const OFAC_URL = "https://api.ofac-api.com/v4/screen";

// Default risk factors object
const getDefaultRiskFactors = (error = null) => ({
    "SDN Sanction": false,
    "Terrorist or Criminal Affliation": false,
    "High-Risk Countries": false,
    "Secondary Sanctions Risk": false,
    "Sectoral Sanctions (SSI)": false,
    ...(error ? { error } : {})
});

// Function to create OFAC request payload
const createOFACPayload = (entity) => {
    // Validate entity
    if (!entity) {
        throw new Error('Entity is required for OFAC verification');
    }

    // Handle different entity formats
    let entityName = '';
    
    if (typeof entity === 'string') {
        entityName = entity;
    } else if (typeof entity === 'object') {
        entityName = entity.name || entity.companyName || '';
    
    }

    if (!entityName) {
        throw new Error('Entity name is required for OFAC verification');
    }

    return {
        apiKey: OFAC_KEY,
        minScore: 98,
        sources: OFAC_SOURCES,
        cases: [{ name: entityName }]
        
    };
};

export const verifyOFAC = async (entity) => {
    try {
        // Handle empty or invalid entities
        if (!entity) {
            console.warn('Empty entity provided for OFAC verification');
            return getDefaultRiskFactors('Empty entity provided');
        }

        const entityName = typeof entity === 'string' ? entity : entity?.name || 'Unknown Entity';
        
        try {
            const payload = createOFACPayload(entity);
            console.log('OFAC Verification Request for:', entityName);

            const response = await axios.post(OFAC_URL, payload);
            const data = response.data;

            // If no results, return default risk factors
            if (!data.results || data.results.length === 0) {
                console.log('No OFAC matches found for:', entityName);
                return getDefaultRiskFactors();
            }

            const riskFactors = getDefaultRiskFactors();

            // Process all matches to determine risk factors
            for (const result of data.results) {
                if (!result.matches) continue;
                
                for (const match of result.matches) {
                    if (!match.sanction) continue;
                    
                    const sanction = match.sanction;
                    const sanctionType = (sanction.source || "").toLowerCase();
                    const programs = new Set(sanction.programs || []);
                    const countries = new Set(sanction.personDetails?.nationalities || []);

                    // Update risk factors based on matches
                    riskFactors["SDN Sanction"] = riskFactors["SDN Sanction"] || sanctionType === "sdn";
                    riskFactors["Terrorist or Criminal Affliation"] = riskFactors["Terrorist or Criminal Affliation"] || programs.has("SDGT") || programs.has("FTO");
                    
                    // Check if any countries from the sanction data are in the FATF high-risk list
                    if (countries.size > 0) {
                        const highRiskCountries = await getHighRiskCountries();
                        riskFactors["High-Risk Countries"] = [...countries].some(country => 
                            highRiskCountries.includes(country)
                        );
                    }
                    
                    riskFactors["Secondary Sanctions Risk"] = riskFactors["Secondary Sanctions Risk"] || sanctionType.includes("NS-PLC");
                    riskFactors["Sectoral Sanctions (SSI)"] = riskFactors["Sectoral Sanctions (SSI)"] || sanctionType === "ssi";
                }
            }

            return riskFactors;

        } catch (error) {
            if (error.message.includes('Entity')) {
                console.warn(`OFAC Validation Warning for ${entityName}:`, error.message);
                return getDefaultRiskFactors(error.message);
            }
            throw error;
        }

    } catch (error) {
        const entityName = typeof entity === 'string' ? entity : entity?.name || 'Unknown Entity';
        console.error('OFAC Verification Error:', {
            entity: entityName,
            error: error.message,
            status: error.response?.status,
            details: error.response?.data
        });

        // Return default risk factors with error for non-critical errors
        return getDefaultRiskFactors(`Failed to verify against OFAC database: ${error.message}`);
    }
};
