const prompts = {
    parseText: `You are an AI Assistant that reads transactions data from pdf and return result in only JSON format it can be any form it can be either structured and unstructured you will be given details such as Transaction Id, Sender, Receiver, Amount, transaction Type, notes, additional notes, etc. You have to analyze the data and return the result in JSON format. 
    Return the result in the following JSON format:
    [
        {
            "transactionId":"",
            "sender":"",
            "senderCountry":"",
            "receiver":"",
            "receiverCountry":"",
            "amount":"",
            "transactionType":"",
            "additionalNotes":"",
        }
    ]
    Given Transaction details:__TRANSACTION_DETAILS__
    Do not write anything expect JSON also do not write or any other format just write the JSON object. Also include all the transaction details`,

    analyzeNews: `
    You are an AI Assistant that reads news articles and assesses the risk level based on details given and that only speaks JSON.
        Analyze the provided text and determine:

        A risk score (0-100) based on keyword detection, sentiment analysis, and contextual risk factors.

        A confidence score (0-100%) indicating the certainty of the assessment.

        Scoring Rules for Risk (0-100):
        Keyword-Based Scoring:
        High-risk terms (+20 points each): "fraud", "money laundering", "sanctions", "bribery", "terrorism", "hacking", "corruption", "extremism"

        Medium-risk terms (+10 points each): "investigation", "fine", "breach", "lawsuit", "penalty", "conflict", "arrest"

        Low-risk terms (+5 points each): "delay", "complaint", "misconduct", "security issue"

        Sentiment-Based Adjustment:
        Strongly Negative Sentiment: +15 points

        Moderately Negative Sentiment: +5 points

        Contextual Factors:
        Company or Individual Directly Named: +10 points

        Repeated Mentions of Risk Terms in Title & Description: +10 points

        Confidence Score Calculation (0-100%):
        90-100%:

        Clear high-risk terms (≥2 high-risk terms) + Direct company/individual mention + Strongly negative sentiment

        70-89%:

        At least 1 high-risk term + Medium/low-risk terms + Negative sentiment but vague context

        50-69%:

        Only medium-risk terms OR weak sentiment analysis result

        Below 50%:

        No clear risk signals, ambiguous language, or neutral sentiment

        Required Input Fields from Article:
        Title: "title" (used for keyword detection)

        Description: "description" (used for keyword detection & sentiment)

        Content: "content" (used for deeper sentiment & risk term analysis)

        Published Date: "publishedAt" (for relevance assessment)

        Source: "source.name" (for credibility assessment)
        News Articles: __NEWS_DATA__
        Analyze all the news articles and provide a consolidated risk assessment in the following JSON format:
        Give confidence score out of 1.
        Provide all the supporting articles link in the array, that are used to calculate the risk score. And which contains the risk terms.
        Output Format
        {
            "risk_score": <risk-score-out-of-100>,
            "confidence": <confidence-score-out-of-1>,
            "articles_links:[<article1_link>, <article2_link>, <article3_link>, ...],
            "reason": "<reason-for-risk-score-in-detailed-manner>",
            "keywords_found": ["<keyword1>", "<keyword2>", "<keyword3>", ...]
        }`,

    comprehensiveAnalysis: `Analyze the transaction data for comprehensive risk assessment focusing on shell companies, sanctioned entities, money laundering, and tax haven risks.

    Transaction Details:
    __TRANSACTION_DATA__

    News Articles:
    __SENDER_NEWS__
    __RECEIVER_NEWS__

    Provide a JSON response with this structure. Donot provide me attributes which have no contribution to risk assessment or those with empty values.    For Entity Type value in summary section : analyse whether the entity is a shell company, coorporation, NGO, PEP, financial intermediaries. Keep the Reason in summary section consise and informative. Supporting_Evidence should name the resource names databases from where the evidence is found.

    {
        "detailedAnalysis": {
            "entities": [
                {
                    "name": "Original entity name",
                    "enrichedName": "Full legal name from registries",
                    "type": "Entity type",
                    "shellCompanyIndicators": {
                        "physicalPresence": {
                            "hasPhysicalOffice": "Boolean",
                            "officeDetails": "Office location and details",
                            "riskLevel": "Risk level"
                        },
                        "directors": {
                            "hasNomineeDirectors": "Boolean",
                            "directorDetails": ["List of directors and their details"],
                            "riskLevel": "Risk level"
                        },
                        "ownershipStructure": {
                            "isComplex": "Boolean",
                            "structureDetails": "Description of ownership structure",
                            "riskLevel": "Risk level"
                        },
                        "businessActivity": {
                            "hasLimitedActivity": "Boolean",
                            "activityDetails": "Description of business activities",
                            "riskLevel": "Risk level"
                        }
                    },
                    "sanctionedEntityRelationships": {
                        "directConnections": ["List of direct connections to sanctioned entities"],
                        "indirectConnections": ["List of indirect connections through ownership"],
                        "historicalAssociations": ["List of historical associations with sanctioned entities"],
                        "geographicRiskFactors": ["List of high-risk geographic factors"]
                    },
                    "moneyLaunderingIndicators": {
                        "suspiciousPatterns": ["List of suspicious transaction patterns"],
                        "highRiskFactors": ["List of high-risk factors"],
                        "redFlags": ["List of red flags identified"],
                        "criminalInvestigations": ["List of ongoing or past criminal investigations"]
                    },
                    "taxHavenIndicators": {
                        "jurisdiction": "Country of registration",
                        "isTaxHaven": "Boolean",
                        "taxHavenType": "Type of tax haven (e.g., Offshore, Secrecy)",
                        "riskLevel": "Risk level",
                        "taxHavenTransactions": ["List of suspicious tax haven transactions"]
                    },
                    "pepStatus": {
                        "isPEP": "Boolean",
                        "pepDetails": "PEP relationship details",
                        "riskLevel": "Risk level"
                    },
                    "regulatoryStatus": {
                        "violations": ["List of regulatory violations"],
                        "complianceStatus": "Current compliance status",
                        "riskLevel": "Risk level"
                    },
                    "relationships": [
                        {
                            "relatedEntity": "Name of related entity",
                            "relationshipType": "Type of relationship",
                            "riskLevel": "Risk level"
                        }
                    ]
                }
            ],
            "riskAssessment": {
                "overallRiskScore": "Risk score (0-1)",
                "confidenceScore": "Confidence in assessment (0-1)",
                "shellCompanyRisk": {
                    "score": "Shell company risk score (0-1)",
                    "indicators": ["List of shell company indicators found"]
                },
                "sanctionedEntityRisk": {
                    "score": "Sanctioned entity risk score (0-1)",
                    "indicators": ["List of sanctioned entity indicators"]
                },
                "moneyLaunderingRisk": {
                    "score": "Money laundering risk score (0-1)",
                    "indicators": ["List of money laundering indicators"]
                },
                "taxHavenRisk": {
                    "score": "Tax haven risk score (0-1)",
                    "indicators": ["List of tax haven indicators"]
                },
                "supportingEvidence": [
                    {
                        "source": "Data source name",
                        "evidence": "Specific evidence found",
                        "confidence": "Confidence in evidence (0-1)"
                    }
                ]
            }
        },
        "summary": {
            "Transaction_ID": "Transaction ID from input",
            "Entity_Names": "List of entity names",
            "Entity_Types": "List of entity types",
            "Risk_Score": "Overall risk score (0-100)",
            "Supporting_Evidence": "Key supporting evidence points",
            "Confidence_Score": "Overall confidence score (0-1)",
            "Reason": "Detailed explanation of risk assessment"
        }
    }

    Use these data sources:
    1. Shell Company Databases:
       - Offshore Leaks Database
       - Panama Papers
       - Paradise Papers
       - Company Registries

    2. Sanctions Databases:
       - OFAC SDN List
       - UN Sanctions List
       - EU Sanctions List
       - National Sanctions Lists

    3. Tax Haven Information:
       - OECD Tax Haven List
       - Financial Secrecy Index
       - Tax Justice Network Reports
       - Offshore Leaks Database

    4. Money Laundering Indicators:
       - FATF High-Risk Jurisdictions
       - Suspicious Activity Reports
       - Transaction Pattern Analysis
       - Criminal Investigation Records

    5. Entity Information:
       - Company Registries
       - Regulatory Filings
       - News Sources
       - Legal Databases

    Focus on identifying and assigning risk levels to the following:
    1. Shell Company Characteristics:
       - Lack of physical presence
       - Nominee directors
       - Complex ownership structures
       - Offshore registration
       - Limited business activity

    2. Sanctioned Entity Relationships:
       - Direct connections to sanctioned entities
       - Indirect relationships through ownership
       - Historical associations
       - Geographic risk factors

    3. Money Laundering Activities:
       - Complex transaction patterns
       - High-risk jurisdictions
       - Unusual business relationships
       - Criminal investigations
       - Regulatory violations

    4. Tax Haven Transactions:
       - Offshore registrations
       - Secrecy jurisdictions
       - Tax avoidance structures
       - Suspicious tax haven transactions

    5. PEP Connections:
       - Political exposure
       - Government connections
       - High-risk relationships
       - Influence indicators`
};

export { prompts };

