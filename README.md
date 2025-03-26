# 🚀 Project Name

## 📌 Table of Contents
- [Introduction](#introduction)
- [Demo](#demo)
- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Challenges We Faced](#challenges-we-faced)
- [How to Run](#how-to-run)
- [Tech Stack](#tech-stack)
- [Team](#team)

---

## 🎯 Introduction

Financial crime risks, including **money laundering, tax fraud, and sanctions violations**, pose a **$2 trillion** global challenge. Current compliance processes rely on **manual risk assessments**, leading to **high operational costs, inefficiencies, and errors.**  

This **AI-driven solution** automates **entity research, verification, and risk scoring** by leveraging **Generative AI, NLP, and anomaly detection**. It cross-references multiple databases, **identifies fraudulent patterns, and provides real-time risk intelligence.**  

### **🌟 Key Features:**  

✅ **Automated Entity Extraction & Enrichment** from structured & unstructured transaction data  
✅ **Real-time Sanctions & PEP Screening** (OFAC, UN, EU, FATF, OpenCorporates, Wikidata)  
✅ **AI-Powered Anomaly Detection** to flag fraudulent entities & shell companies  
✅ **Comprehensive Risk Scoring Framework** (Sanctions, Shell Companies, Tax Havens)  
✅ **News Sentiment Analysis** for reputation-based risk assessment  
✅ **Real-time API & Dashboard for Risk Monitoring**  


## 🎥 Demo
🔗 [Live Demo](#) (if applicable)  
📹 [Video Demo](#) (if applicable)  
🖼️ Sample Response:
```json
{
    "success": true,
    "message": "Risk calculated successfully",
    "fileType": "TEXT",
    "detailedAnalyses": [
        {
            "entities": [
                {
                    "name": "Apollo Quiboloy",
                    "type": "PEP",
                    "pepStatus": {
                        "isPEP": true,
                        "pepDetails": "Person of interest linked to illicit activity.",
                        "riskLevel": "High"
                    },
                    "moneyLaunderingIndicators": {
                        "suspiciousPatterns": [
                            "Large wire transfer to Switzerland.",
                            "Transaction flagged as requiring further review."
                        ],
                        "highRiskFactors": [
                            "Link to known illicit activity."
                        ],
                        "redFlags": [
                            "Unexplained wealth.",
                            "Use of offshore accounts."
                        ]
                    }
                },
                {
                    "name": "Toronto-Dominion Bank",
                    "type": "Financial Intermediaries",
                    "sanctionedEntityRelationships": {
                        "geographicRiskFactors": [
                            "Switzerland"
                        ]
                    },
                    "moneyLaunderingIndicators": {
                        "highRiskFactors": [
                            "High-risk jurisdiction (Switzerland).",
                            "News articles indicate financial losses and regulatory scrutiny, potential penalty for money laundering."
                        ],
                        "redFlags": [
                            "Recent appointment of compliance monitor.",
                            "Significant US penalty for money laundering."
                        ],
                        "criminalInvestigations": [
                            "Ongoing investigation for money laundering"
                        ]
                    },
                    "regulatoryStatus": {
                        "violations": [
                            "Significant US penalty for money laundering"
                        ],
                        "complianceStatus": "Under scrutiny; compliance monitor appointed.",
                        "riskLevel": "High"
                    }
                }
            ],
            "riskAssessment": {
                "overallRiskScore": "0.85",
                "confidenceScore": "0.85",
                "moneyLaunderingRisk": {
                    "score": "0.9",
                    "indicators": [
                        "Large wire transfer flagged for illicit activity.",
                        "Transfer to Switzerland.",
                        "TD Bank faces money laundering penalties and investigations.",
                        "News articles indicate financial losses and regulatory scrutiny."
                    ]
                },
                "taxHavenRisk": {
                    "score": "0.7",
                    "indicators": [
                        "Transfer to Switzerland (potential tax haven)."
                    ]
                },
                "sanctionedEntityRisk": {
                    "score": "0.6",
                    "indicators": [
                        "TD Bank sanction related risk"
                    ]
                },
                "supportingEvidence": [
                    {
                        "source": "Transaction Details",
                        "evidence": "Linked to known illicit activity. Requires further review.",
                        "confidence": "0.9"
                    },
                    {
                        "source": "News Articles",
                        "evidence": "TD Bank appointing compliance monitor after significant US penalty for money laundering.",
                        "confidence": "0.8"
                    }
                ]
            }
        },
        {
            "entities": [
                {
                    "name": "Revival of Islamic Heritage Society (RIHS)",
                    "type": "NGO",
                    "moneyLaunderingIndicators": {
                        "highRiskFactors": [
                            "Linked to known illicit activity"
                        ],
                        "redFlags": [
                            "Association with individuals or groups expressing extremist views."
                        ]
                    },
                    "sanctionedEntityRelationships": {
                        "geographicRiskFactors": [
                            "Kuwait"
                        ]
                    },
                    "relationships": [
                        {
                            "relatedEntity": "Procter & Gamble Co.",
                            "relationshipType": "Transacting Party",
                            "riskLevel": "Low"
                        }
                    ],
                    "pepStatus": {
                        "isPEP": "Unknown",
                        "riskLevel": "Unknown"
                    }
                },
                {
                    "name": "Procter & Gamble Co.",
                    "type": "Corporation",
                    "regulatoryStatus": {
                        "violations": [
                            "Article mentions 'alleges' which indicates a regulatory risk"
                        ],
                        "complianceStatus": "Potentially under scrutiny for false marketing",
                        "riskLevel": "Medium"
                    }
                }
            ],
            "riskAssessment": {
                "overallRiskScore": "0.6",
                "confidenceScore": "0.70",
                "moneyLaunderingRisk": {
                    "score": "0.7",
                    "indicators": [
                        "Linked to known illicit activity",
                        "Association with extremist views based on keywords found in news articles."
                    ]
                },
                "sanctionedEntityRisk": {
                    "score": "0.4",
                    "indicators": [
                        "Geographic risk factor: Kuwait"
                    ]
                },
                "regulatoryRisk": {
                    "score": "0.5",
                    "indicators": [
                        "Allegations of false marketing"
                    ]
                },
                "supportingEvidence": [
                    {
                        "source": "Transaction Details",
                        "evidence": "Additional Notes: Linked to known illicit activity. Requires further review.",
                        "confidence": "0.9"
                    },
                    {
                        "source": "News Articles",
                        "evidence": "Presence of 'Salafists' and 'supporting' keywords indicating potential extremism-related risks.",
                        "confidence": "0.75"
                    },
                    {
                        "source": "News Articles",
                        "evidence": "Article mentions 'alleges' regarding ZzzQuil, indicating potential regulatory issues.",
                        "confidence": "0.55"
                    }
                ]
            }
        },
        {
            "entities": [
                {
                    "name": "Hezbollah",
                    "enrichedName": "Hezbollah (Party of God)",
                    "type": "NGO",
                    "sanctionedEntityRelationships": {
                        "directConnections": [],
                        "indirectConnections": [],
                        "historicalAssociations": [],
                        "geographicRiskFactors": [
                            "Lebanon",
                            "Syria",
                            "France"
                        ]
                    },
                    "moneyLaunderingIndicators": {
                        "suspiciousPatterns": [],
                        "highRiskFactors": [
                            "Designated terrorist group",
                            "Known to operate through illicit financial networks"
                        ],
                        "redFlags": [],
                        "criminalInvestigations": []
                    },
                    "regulatoryStatus": {
                        "violations": [],
                        "complianceStatus": "Non-compliant due to terrorist designation",
                        "riskLevel": "High"
                    },
                    "relationships": []
                },
                {
                    "name": "IBM Corporation",
                    "enrichedName": "International Business Machines Corporation",
                    "type": "Corporation",
                    "relationships": []
                }
            ],
            "riskAssessment": {
                "overallRiskScore": "0.9",
                "confidenceScore": "0.8",
                "shellCompanyRisk": {
                    "score": "0.0",
                    "indicators": []
                },
                "sanctionedEntityRisk": {
                    "score": "0.9",
                    "indicators": [
                        "Sender is a designated terrorist organization."
                    ]
                },
                "moneyLaunderingRisk": {
                    "score": "0.8",
                    "indicators": [
                        "Transaction originates from a sanctioned entity.",
                        "Additional notes indicate links to illicit activity."
                    ]
                },
                "taxHavenRisk": {
                    "score": "0.0",
                    "indicators": []
                },
                "supportingEvidence": [
                    {
                        "source": "OFAC SDN List",
                        "evidence": "Hezbollah is listed as a Specially Designated National.",
                        "confidence": "1.0"
                    },
                    {
                        "source": "Additional Notes",
                        "evidence": "Transaction is linked to known illicit activity and requires further review.",
                        "confidence": "0.7"
                    }
                ]
            }
        },
        {
            "entities": [
                {
                    "name": "Bashar al-Assad",
                    "enrichedName": "Bashar Hafez al-Assad",
                    "type": "PEP",
                    "shellCompanyIndicators": {
                        "physicalPresence": {
                            "hasPhysicalOffice": false,
                            "riskLevel": "High",
                            "officeDetails": "Likely uses proxies or shell entities"
                        },
                        "directors": {
                            "hasNomineeDirectors": true,
                            "riskLevel": "High",
                            "directorDetails": [
                                "Likely utilizes nominee directors to obscure control."
                            ]
                        },
                        "ownershipStructure": {
                            "isComplex": true,
                            "riskLevel": "High",
                            "structureDetails": "Probable complex structures to hide beneficial ownership."
                        },
                        "businessActivity": {
                            "hasLimitedActivity": true,
                            "riskLevel": "High",
                            "activityDetails": "Business activities likely obscured or minimal."
                        }
                    },
                    "sanctionedEntityRelationships": {
                        "directConnections": [],
                        "indirectConnections": [],
                        "historicalAssociations": [],
                        "geographicRiskFactors": [
                            "Syria (High-risk region)",
                            "Germany(As a country of transaction)"
                        ]
                    },
                    "moneyLaunderingIndicators": {
                        "suspiciousPatterns": [
                            "Large wire transfer from a high-risk individual",
                            "Transaction flagged for illicit activity"
                        ],
                        "highRiskFactors": [
                            "PEP Status",
                            "Association with conflict zone"
                        ],
                        "redFlags": [
                            "Transaction from politically exposed person in Germany",
                            "Linked to known illicit activity"
                        ],
                        "criminalInvestigations": []
                    },
                    "taxHavenIndicators": {
                        "jurisdiction": "Germany",
                        "isTaxHaven": false,
                        "riskLevel": "Low",
                        "taxHavenTransactions": []
                    },
                    "pepStatus": {
                        "isPEP": true,
                        "pepDetails": "Former President of Syria",
                        "riskLevel": "High"
                    },
                    "regulatoryStatus": {
                        "violations": [],
                        "complianceStatus": "Unknown",
                        "riskLevel": "High"
                    },
                    "relationships": []
                },
                {
                    "name": "Google LLC",
                    "enrichedName": "Google LLC",
                    "type": "Corporation",
                    "shellCompanyIndicators": {
                        "physicalPresence": {
                            "hasPhysicalOffice": true,
                            "riskLevel": "Low"
                        },
                        "directors": {
                            "hasNomineeDirectors": false,
                            "riskLevel": "Low"
                        },
                        "ownershipStructure": {
                            "isComplex": false,
                            "riskLevel": "Low"
                        },
                        "businessActivity": {
                            "hasLimitedActivity": false,
                            "riskLevel": "Low"
                        }
                    },
                    "sanctionedEntityRelationships": {
                        "directConnections": [],
                        "indirectConnections": [],
                        "historicalAssociations": [],
                        "geographicRiskFactors": []
                    },
                    "moneyLaunderingIndicators": {
                        "suspiciousPatterns": [],
                        "highRiskFactors": [],
                        "redFlags": [],
                        "criminalInvestigations": []
                    },
                    "taxHavenIndicators": {
                        "jurisdiction": "Australia",
                        "isTaxHaven": false,
                        "riskLevel": "Low",
                        "taxHavenTransactions": []
                    },
                    "pepStatus": {
                        "isPEP": false,
                        "riskLevel": "Low"
                    },
                    "regulatoryStatus": {
                        "violations": [],
                        "complianceStatus": "Unknown",
                        "riskLevel": "Medium"
                    },
                    "relationships": []
                }
            ],
            "riskAssessment": {
                "overallRiskScore": "0.9",
                "confidenceScore": "0.9",
                "shellCompanyRisk": {
                    "score": "0.7",
                    "indicators": [
                        "Lack of physical presence (Likely)",
                        "Nominee directors (Likely)",
                        "Complex ownership structures (Likely)",
                        "Offshore registration (Germany, but for Assad as a PEP, this is a risk indicator)",
                        "Limited business activity (Likely)"
                    ]
                },
                "sanctionedEntityRisk": {
                    "score": "0.8",
                    "indicators": [
                        "Geographic risk factors",
                        "High-risk individual (PEP)"
                    ]
                },
                "moneyLaunderingRisk": {
                    "score": "0.9",
                    "indicators": [
                        "Suspicious transaction patterns",
                        "High-risk factors (PEP status)",
                        "Red flags (Transaction from PEP, linked to illicit activity)"
                    ]
                },
                "taxHavenRisk": {
                    "score": "0.3",
                    "indicators": []
                },
                "supportingEvidence": [
                    {
                        "source": "News Articles",
                        "evidence": "Mentions of violence, mass killings, and clashes within Syria.",
                        "confidence": "0.85"
                    },
                    {
                        "source": "Transaction Details",
                        "evidence": "Additional notes: 'Linked to known illicit activity. Requires further review.'",
                        "confidence": "1.0"
                    },
                    {
                        "source": "OFAC SDN List",
                        "evidence": "Potential match for Bashar al-Assad",
                        "confidence": "0.7"
                    },
                    {
                        "source": "Company Registries",
                        "evidence": "Need to verify details for Bashar al-Assad and Google LLC",
                        "confidence": "0.5"
                    }
                ]
            }
        },
        {
            "entities": [
                {
                    "name": "TGR Group",
                    "enrichedName": "TGR Group GmbH (Assuming German entity)",
                    "type": "Corporation",
                    "shellCompanyIndicators": {
                        "physicalPresence": {
                            "hasPhysicalOffice": null,
                            "riskLevel": null
                        },
                        "directors": {
                            "hasNomineeDirectors": null,
                            "riskLevel": null
                        },
                        "ownershipStructure": {
                            "isComplex": null,
                            "riskLevel": null
                        },
                        "businessActivity": {
                            "hasLimitedActivity": null,
                            "riskLevel": null
                        }
                    },
                    "sanctionedEntityRelationships": {
                        "directConnections": [],
                        "indirectConnections": [],
                        "historicalAssociations": [],
                        "geographicRiskFactors": []
                    },
                    "moneyLaunderingIndicators": {
                        "suspiciousPatterns": [],
                        "highRiskFactors": [],
                        "redFlags": [],
                        "criminalInvestigations": []
                    },
                    "taxHavenIndicators": {
                        "jurisdiction": "Germany",
                        "isTaxHaven": false,
                        "riskLevel": "Low"
                    },
                    "pepStatus": {
                        "isPEP": null,
                        "riskLevel": null
                    },
                    "regulatoryStatus": {
                        "violations": [],
                        "complianceStatus": "Unknown",
                        "riskLevel": "Unknown"
                    },
                    "relationships": [
                        {
                            "relatedEntity": "Sanofi S.A.",
                            "relationshipType": "Sender/Receiver",
                            "riskLevel": "Medium"
                        }
                    ]
                },
                {
                    "name": "Sanofi S.A.",
                    "enrichedName": "Sanofi S.A. (Assuming French entity, operating in China)",
                    "type": "Corporation",
                    "shellCompanyIndicators": {
                        "physicalPresence": {
                            "hasPhysicalOffice": null,
                            "riskLevel": null
                        },
                        "directors": {
                            "hasNomineeDirectors": null,
                            "riskLevel": null
                        },
                        "ownershipStructure": {
                            "isComplex": null,
                            "riskLevel": null
                        },
                        "businessActivity": {
                            "hasLimitedActivity": null,
                            "riskLevel": null
                        }
                    },
                    "sanctionedEntityRelationships": {
                        "directConnections": [],
                        "indirectConnections": [],
                        "historicalAssociations": [],
                        "geographicRiskFactors": []
                    },
                    "moneyLaunderingIndicators": {
                        "suspiciousPatterns": [],
                        "highRiskFactors": [],
                        "redFlags": [],
                        "criminalInvestigations": []
                    },
                    "taxHavenIndicators": {
                        "jurisdiction": "France",
                        "isTaxHaven": false,
                        "riskLevel": "Low"
                    },
                    "pepStatus": {
                        "isPEP": null,
                        "riskLevel": null
                    },
                    "regulatoryStatus": {
                        "violations": [],
                        "complianceStatus": "Unknown",
                        "riskLevel": "Unknown"
                    },
                    "relationships": [
                        {
                            "relatedEntity": "TGR Group",
                            "relationshipType": "Receiver/Sender",
                            "riskLevel": "Medium"
                        }
                    ]
                }
            ],
            "riskAssessment": {
                "overallRiskScore": "0.65",
                "confidenceScore": "0.85",
                "shellCompanyRisk": {
                    "score": "0.2",
                    "indicators": []
                },
                "sanctionedEntityRisk": {
                    "score": "0.3",
                    "indicators": []
                },
                "moneyLaunderingRisk": {
                    "score": "0.6",
                    "indicators": [
                        "Transaction linked to known illicit activity",
                        "News articles indicate increased illicit activity involving AWS and Crypto Exchanges"
                    ]
                },
                "taxHavenRisk": {
                    "score": "0.1",
                    "indicators": []
                },
                "supportingEvidence": [
                    {
                        "source": "Transaction Details",
                        "evidence": "Additional notes indicate link to known illicit activity, requiring further review.",
                        "confidence": "0.95"
                    },
                    {
                        "source": "News Articles",
                        "evidence": "News articles indicate potential hacking, phishing, money laundering and sanction risks. The mention of Garantex crypto exchange and AWS misconfigurations is significant.",
                        "confidence": "0.8"
                    }
                ]
            }
        }
    ],
    "summaryAnalyses": [
        {
            "transactionId": "TXN-2024-0001",
            "Entities": [
                "Apollo Quiboloy",
                "Toronto-Dominion Bank"
            ],
            "EntityType": [
                "PEP",
                "Financial Intermediaries"
            ],
            "RiskScore": 75,
            "SupportingEvidence": "Transaction linked to illicit activity; TD Bank under scrutiny for money laundering.",
            "ConfidenceScore": 0.85,
            "Reason": "High risk due to connection to illicit activities, potential tax haven use, and money laundering issues with TD Bank.",
            "timestamp": "2025-03-26T15:04:27.201Z"
        },
        {
            "transactionId": "TXN-2024-0002",
            "Entities": [
                "Revival of Islamic Heritage Society (RIHS)",
                "Procter & Gamble Co."
            ],
            "EntityType": [
                "NGO",
                "Corporation"
            ],
            "RiskScore": 60,
            "SupportingEvidence": "Transaction notes indicate a link to illicit activity and news articles show potential ties to extremism and allegations regarding false marketing",
            "ConfidenceScore": 0.85,
            "Reason": "RIHS flagged for potential money laundering risks due to its connection to illicit activity and potential ties to extremism, as indicated by news articles. Procter & Gamble faces regulatory risks based on news reports. Requires further investigation for deeper insights.",
            "timestamp": "2025-03-26T15:04:00.356Z"
        },
        {
            "transactionId": "TXN-2024-0003",
            "Entities": [
                "Hezbollah",
                "IBM Corporation"
            ],
            "EntityType": [
                "NGO",
                "Corporation"
            ],
            "RiskScore": 90,
            "SupportingEvidence": "Hezbollah is a sanctioned entity; transaction linked to illicit activity.",
            "ConfidenceScore": 0.85,
            "Reason": "High risk due to the sender being a designated terrorist organization (Hezbollah). The transaction also has additional notes indicating links to known illicit activity, raising concerns about potential money laundering or terrorist financing.",
            "timestamp": "2025-03-26T15:04:42.207Z"
        },
        {
            "transactionId": "TXN-2024-0004",
            "Entities": [
                "Bashar al-Assad",
                "Google LLC"
            ],
            "EntityType": [
                "PEP",
                "Corporation"
            ],
            "RiskScore": 90,
            "SupportingEvidence": "Transaction flagged for illicit activity, involving a known PEP (Bashar al-Assad) from Germany. News articles indicate a high-risk environment associated with Syria. Potential violation of sanctions regulations.",
            "ConfidenceScore": 0.9,
            "Reason": "High risk due to PEP involvement, link to illicit activity, potential for sanctions violation, and association with a high-risk geographic region.",
            "timestamp": "2025-03-26T15:04:13.054Z"
        },
        {
            "transactionId": "TXN-2024-0005",
            "Entities": [
                "TGR Group",
                "Sanofi S.A."
            ],
            "EntityType": [
                "Corporation",
                "Corporation"
            ],
            "RiskScore": 65,
            "SupportingEvidence": "Transaction is linked to known illicit activities based on internal notes and heightened cyber security and sanctioned entities based on articles.",
            "ConfidenceScore": 0.85,
            "Reason": "The transaction is flagged due to notes indicating links to illicit activity and high-risk news articles about illicit AWS misconfigurations, sanction evasion through crypto exchanges and potential risks to Sanofi.",
            "timestamp": "2025-03-26T15:04:37.685Z"
        }
    ]
}
```

![Screenshot 1](link-to-image)

## 💡 Inspiration
- **Regulatory compliance costs exceed $10 billion annually.**  
- **Over 70% of money laundering cases involve shell companies and offshore accounts.**  
- **Manual risk assessment is error-prone, slow, and expensive.**  
- **AI-driven automation can transform financial risk monitoring, improving accuracy and efficiency.**  

## ⚙️ What It Does
Our AI-powered **Entity Risk Analysis & Sanctions Screening System** automates the **identification, verification, and risk scoring** of entities involved in financial transactions. It leverages **Generative AI, Machine Learning (XGBoost), and multi-source data enrichment** to detect **fraudulent activities, shell companies, and sanctioned entities** with high accuracy.  

### **🔹 Step 1: Document & Transaction Parsing**  
- **Processes PDFs, CSVs, and TXT files** to extract structured transaction data.  
- Uses **Google Gemini (Generative AI)** to extract sender, receiver, transaction details.  

### **🔹 Step 2: Entity Extraction & Enrichment**  
- Identifies **sender and receiver details** (company name, aliases, industry, location).  
- Cross-checks entity details against:  
  - **OFAC, FATF, UN, and EU sanctions lists**.  
  - **OpenCorporates, Wikidata, and SEC EDGAR filings**.  
  - **Financial leaks databases (Panama Papers, Paradise Papers, etc.).**  

### **🔹 Step 3: Risk Prediction Using ML Model**  
- **Extracted details are fed into a trained XGBoost model**.  
- The model **predicts risk scores based on transaction patterns, entity history, and regulatory data**.  
- **Anomaly detection flags shell companies & high-risk entities.**  

### **🔹 Step 4: Real-Time News & Social Media Analysis**  
- **Uses Google Gemini to extract financial news, negative sentiment, and social media mentions**.  
- Identifies **negative press, fraud allegations, or regulatory violations** related to the entities.  

### **🔹 Step 5: AI-Powered Comprehensive Analysis**  
- **Combines transaction details, ML-based predictions, and news insights.**  
- Uses **LLM (GPT-4 or Gemini)** to generate a **detailed risk assessment report**.  
- **Includes justification, risk factors, and supporting evidence for each flagged entity.**  

### **🔹 Step 6: Risk Score & Confidence Score Calculation**  
- **Combines the AI-driven analysis and ML model predictions**.  
- Generates **final risk and confidence scores**, integrating multiple factors like:  
  - **Sanctions status**  
  - **Shell company risk**  
  - **News sentiment & credibility**  
  - **Historical fraud patterns**  

### **🔹 Step 7: Output Generation**  
✅ **Generates a structured JSON report** with detailed entity analysis.  
✅ **Provides a confidence score** based on AI and data source reliability.  
✅ **Offers a risk summary with recommendations for financial analysts.**  

### **🔥 Why This Approach is Powerful?**  
✅ **Multi-source entity intelligence for high accuracy**  
✅ **Combines ML predictions & LLM reasoning for better risk scoring**  
✅ **Real-time data from financial news & social media**  
✅ **Reduces false positives by integrating multiple risk signals**  
✅ **Fully automated risk assessment, reducing manual workload by over 70%**  

This **AI-driven, multi-layered risk analysis system** empowers **banks, financial institutions, and compliance teams** to **detect high-risk entities, prevent fraud, and ensure regulatory compliance in real-time.** 🚀

## 🛠️ How We Built It
Our **AI-powered Entity Risk Analysis & Sanctions Screening System** is built using a **modular architecture** that integrates **multiple APIs, Machine Learning models, and AI-powered analytics** for **real-time entity risk assessment**.  

### **🔹 Backend (Node.js) – API Integration & Data Processing**  
The backend is developed using **Node.js**, which acts as the central hub for **fetching, processing, and analyzing data** from various sources.  

#### **✅ APIs & Their Utilization:**  

1️⃣ **🔗 OpenCorporates API**  
- **Purpose:** Fetches **legal status, incorporation date, business type, and directors** for a given entity.  
- **How We Use It:**  
  - When a **company name or registration number** is provided, we **query OpenCorporates** to retrieve detailed company information.  
  - Helps **identify shell companies & complex ownership structures**.  

2️⃣ **🔗 OFAC Sanctions API**  
- **Purpose:** Checks if an entity is **sanctioned by the U.S. government**.  
- **How We Use It:**  
  - Queries **sanctions lists** for matches with **entity names, aliases, or tax IDs**.  
  - Flags entities **directly or indirectly linked to sanctioned individuals or businesses**.  

3️⃣ **🔗 FATF API & Global Watchlists**  
- **Purpose:** Identifies entities listed in the **Financial Action Task Force (FATF) High-Risk Jurisdictions.**  
- **How We Use It:**  
  - Flags **businesses and individuals operating in high-risk countries**.  
  - Helps detect **money laundering and illicit financial activities**.  

4️⃣ **🔗 SEC EDGAR API**  
- **Purpose:** Fetches **regulatory filings & compliance reports** for publicly listed companies.  
- **How We Use It:**  
  - Checks if an entity has been **involved in financial fraud, non-compliance, or legal violations**.  
  - Extracts **financial risk indicators from SEC reports**.  

5️⃣ **🔗 Wikidata API**  
- **Purpose:** Provides **entity metadata, industry classification, global presence, and aliases**.  
- **How We Use It:**  
  - Cross-verifies **business names, industry types, and locations**.  
  - Helps **resolve ambiguities between similar entity names**.  

6️⃣ **🔗 Google News & Social Media APIs**  
- **Purpose:** **Extracts real-time news & sentiment analysis** related to entities.  
- **How We Use It:**  
  - Calls **Google/Bing News API** to fetch **latest news articles related to the entity**.  
  - Uses **Gemini AI to analyze article sentiment** and detect **negative mentions or fraud allegations**.  

7️⃣ **🔗 Transaction Parsing & Gemini API**  
- **Purpose:** **Parses PDF and transaction details** to extract key information.  
- **How We Use It:**  
  - Uses **Gemini AI to extract sender, receiver, transaction amount, currency type**.  
  - Provides structured data for risk analysis.  

### **🔹 Machine Learning Model Hosting (Flask - Python Backend)**  
- We use **Flask** to **host and serve the ML model**, which is trained to **predict risk scores based on transaction patterns & historical fraud data.**  
- The **Flask API** receives **entity details from the Node.js backend**, processes them through an **XGBoost model**, and returns a **predicted risk score**.  
- **Model Features Used:**  
  - **Transaction history (amount, frequency, origin/destination country)**  
  - **Entity type (corporation, shell company, financial intermediary)**  
  - **OFAC & FATF risk levels**  
  - **News sentiment & regulatory compliance history**
 
### **🔹 Frontend (React & MUI) – Interactive Risk Monitoring Dashboard**  
- The frontend is built using **React.js** with **Material UI (MUI)** for a **modern, responsive design**.  

### **🔥 Why This Architecture Works?**  
✅ **Scalable & Modular:** Separate **Node.js backend, Flask ML server, and React frontend** allow independent scaling.  
✅ **Real-time AI Insights:** LLM & ML-powered risk analysis ensures **faster fraud detection**.  
✅ **Seamless API Integration:** Aggregates data from multiple sources for **comprehensive risk evaluation**.  
✅ **User-Friendly Dashboard:** Provides **real-time monitoring & insights** for compliance teams.  

## 🚧 Challenges We Faced

1️⃣ **Understanding Different APIs**  
- Each API had different data formats and authentication methods.  
- Standardized responses using a unified API processing layer in Node.js.  

2️⃣ **Correlating Data from Multiple Sources**  
- Entity names and IDs varied across databases.  
- Used fuzzy matching and cross-referencing tax IDs, LEIs, and aliases.  

3️⃣ **Cleaning & Normalizing Data for ML Training**  
- Inconsistent, missing, and duplicate records.  
- Standardized entity names, filled missing values, and removed outdated entries.  

4️⃣ **Preparing Sample Dataset for ML Model**  
- No single dataset contained all required information.  
- Created a synthetic dataset using real sanctions data, fraud cases, and AI-generated samples.  

5️⃣ **Optimizing Risk Scoring Model**  
- Initial ML model had high false positives.  
- Fine-tuned XGBoost model and improved sentiment analysis for better accuracy.  

6️⃣ **Handling Large-Scale Data Processing & API Rate Limits**  
- APIs like OpenCorporates and SEC EDGAR had request limits.  
- Implemented caching, batch processing, and asynchronous API calls.  

7️⃣ **Generating Explainable AI Risk Reports**  
- Needed clear justifications for risk scores.  
- Integrated LLM-based explanations with structured JSON outputs.  

## 🏃 How to Run
Clone the repository  
   ```sh
   git clone https://github.com/aidel-ctrl-alt-defeat.git
   ```
Steps to Run Python Model
1. Navigate to backend/services/risk_model

1. Create a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Service

Start the Flask server:
```bash
python risk_model.py
```

Steps to run backend
1. Navigate to backend folder
2. Add .env file with following values
```
GEMINI_API_KEY = 
PORT = 3000
NEWS_API_KEY = 
```
```bash
npm i
```
```bash
npx nodemon
```



## Architecture Diagram

![arch](https://github.com/user-attachments/assets/4aaad493-6a50-47fc-a7a5-884a4419d2df)



## 🏗️ Tech Stack
- 🔹 Frontend: React.js, Material UI
- 🔹 Backend: Node.js, Flask
- 🔹 LLM: Gemini
- 🔹 Data Sources: OFAC, OpenCorporates, Wikidata, Google News API, NewsAPI, FATF, PEP
- 🔹 ML Model - XGBoost

## 👥 Team
- **Prasoon Soni** - [GitHub](https://github.com/prasoonsoni) | [LinkedIn](https://www.linkedin.com/in/prasoonsoni/)
- **Swastika Pandey** - [GitHub](https://github.com/swastikapandey11) | [LinkedIn](https://www.linkedin.com/in/swastika-pandey-4b20961b9/)
- **Merin Thomas** - [GitHub](https://github.com/mer-thomas) | [LinkedIn](https://www.linkedin.com/in/swastika-pandey-4b20961b9/)
- **Anushka Anand** - [GitHub](https://github.com/Anushka20365) | [LinkedIn](#)
- **Manish Kumar Shikarbar** - [LinkedIn](https://www.linkedin.com/in/manish-kumar-s-5985b215/)
