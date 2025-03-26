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
🖼️ Screenshots:

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
1. Clone the repository  
   ```sh
   git clone https://github.com/your-repo.git
   ```
2. Install dependencies  
   ```sh
   npm install  # or pip install -r requirements.txt (for Python)
   ```
3. Run the project  
   ```sh
   npm start  # or python app.py
   ```
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
