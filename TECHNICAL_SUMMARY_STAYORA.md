Here is the portfolio entry for Stayora.

I have structured this to highlight the Hybrid Database Architecture (Relational + Vector) and the Natural Language Processing capabilities, as these show advanced engineering skills beyond standard CRUD applications.

🏨 Stayora
AI-Driven Hospitality Intelligence Platform
Quick Summary: A real-time analytics platform deployed for luxury hotels (CHF 45M+ revenue). It ingests operational data to provide role-specific dashboards and features a "Text-to-SQL" engine that allows non-technical staff to query complex datasets using natural language.

🛠️ Tech Stack
Frontend: React 18, Vite, TailwindCSS, Recharts

Backend: Node.js (API Gateway), Python FastAPI (Review Analysis Microservice)

Database: MySQL (Structured Metrics), ChromaDB (Vector Embeddings)

AI/ML: OpenAI GPT-4o (SQL Generation), text-embedding-ada-002

Infrastructure: AWS EC2, Docker, Passport.js (OAuth 2.0)

🏗️ System Architecture
The system utilizes a Hybrid Microservices Architecture to separate business logic from heavy computation.

Orchestration Layer: A Node.js/Express API gateway handles authentication, session management, and routs requests.

Structured Data Layer: Operational metrics (RevPAR, Occupancy, GOP) are stored in a normalized MySQL schema for strict ACID compliance and financial reporting.

Unstructured Intelligence: Guest reviews and qualitative feedback are processed by a Python FastAPI service, vector-embedded, and stored in ChromaDB for semantic search.

Role-Based Access: The architecture isolates data views across 6 distinct roles (GM, Owner, Finance, etc.) to ensure data privacy at the database query level.

🛡️ Key Technical Highlights
1. Text-to-SQL Query Engine
To enable natural language querying for hotel managers, I engineered a pipeline that converts English questions into executable SQL.

Context Injection: The prompt dynamically injects the SQL schema and user role context to ensure the AI understands the table relationships.

Safety Layer: A middleware parses the generated SQL to enforce SELECT-only execution, preventing injection attacks or accidental data mutation.

Self-Correction: If the query fails, the error message is fed back into the LLM to auto-correct the syntax.

2. Retrieval Augmented Generation (RAG) for Reviews
Standard keyword search fails to capture sentiment. I implemented a RAG pipeline using ChromaDB.

Hybrid Retrieval: The system performs a semantic vector search to find relevant guest reviews, then filters them by date in MySQL to create a "time-aware" context window.

Synthesis: GPT-4o synthesizes these retrieved reviews into actionable insights (e.g., "Why is housekeeping rated low in July?").

3. Complex Data Processing Pipeline
Ingestion: Custom stream-based parsers (csv-parser, xlsx) handle massive file uploads without blocking the Node.js event loop.

Batch Embedding: Data is transformed into natural language narratives (e.g., "On 2024-05-12, ADR was 450") and batched (1000 items/batch) for embedding generation to minimize API latency.

💻 Code Highlight: Context-Aware SQL Generation
A snippet showing how schema context is injected into the LLM to ensure accurate SQL generation based on the user's role.

JavaScript

// Dynamic Prompt Construction for Text-to-SQL
const generateSqlPrompt = (userQuestion, userRole, schemaSummary) => {
  return `
    You are a MySQL expert. Convert the following natural language question into a SQL query.
    
    CONTEXT:
    - Role: ${userRole} (Only access tables relevant to this role)
    - Schema: ${schemaSummary}
    - Question: "${userQuestion}"

    RULES:
    1. Return ONLY the raw SQL query. No markdown, no explanations.
    2. Use strictly READ-ONLY (SELECT) statements.
    3. If the user asks for "Revenue", sum the 'total_revenue' column from 'daily_metrics'.
    4. Always limit results to the current hotel_id session.
  `;
};
🚧 Challenges & Solutions
Challenge: Vector Context vs. Time Sensitivity

Problem: Vector databases are excellent for semantic similarity but struggle with strict time-filtering (e.g., "Show me reviews from last week"). A pure vector search might return highly relevant reviews from 2 years ago.

Solution: Implemented a Two-Step Retrieval. First, a metadata filter in ChromaDB narrows the search space by date range. Second, the vector search runs on this subset. This ensures insights are both semantically relevant and operationally current.

Challenge: Metric Aggregation Performance

Problem: Calculating "Year-to-Date GOP" for a dashboard required summing thousands of rows on every page load, causing latency.

Solution: Optimized database indexing on composite keys (hotel_id, date) and implemented query caching for historical data that does not change, reducing dashboard load time by ~60%.