# Stayora: Complete Technical Summary

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Backend Architecture](#backend-architecture)
5. [Frontend Architecture](#frontend-architecture)
6. [Database Design](#database-design)
7. [AI/ML Integration](#aiml-integration)
8. [Authentication & Authorization](#authentication--authorization)
9. [API Architecture](#api-architecture)
10. [Data Processing Pipeline](#data-processing-pipeline)
11. [Deployment & Infrastructure](#deployment--infrastructure)
12. [Security Implementation](#security-implementation)
13. [Performance Optimizations](#performance-optimizations)
14. [Key Features & Capabilities](#key-features--capabilities)
15. [Development Workflow](#development-workflow)

---

## Project Overview

**Stayora** is a comprehensive, real-time hotel intelligence platform that transforms raw operational data into actionable, role-specific insights. The platform serves luxury hotels by providing AI-powered analytics, natural language querying, and multi-dimensional data visualization.

### Core Value Proposition
- **Real-Time Data Processing**: Live updates as events occur (check-ins, bookings, cancellations)
- **Role-Specific Intelligence**: Customized dashboards for 6 unique roles (GM, Owner, Finance, Commercial, F&B, Marketing)
- **AI-Powered Insights**: Automated categorization, predictive analytics, and actionable recommendations
- **Natural Language Querying**: Text-to-SQL conversion and semantic search capabilities
- **Multi-Source Data Integration**: Combines structured metrics with unstructured review data

### Business Impact
- Processes real luxury hotel data (CHF 45M+ annual revenue properties)
- Supports multiple properties with hotel-specific data isolation
- Enables data-driven decision making across all hotel departments
- Reduces time-to-insight from hours to seconds

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  React 18 + Vite + TailwindCSS + Recharts                  │
│  - Dashboard Components                                     │
│  - Chat Interface                                           │
│  - Strategy Pages                                           │
│  - Admin Panel                                             │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST API
┌────────────────────┴────────────────────────────────────────┐
│                     Backend API Layer                       │
│  Node.js + Express.js                                       │
│  - RESTful API Endpoints                                    │
│  - Authentication Middleware                                │
│  - Business Logic Controllers                               │
│  - Data Processing Utilities                                │
└────┬──────────────────────┬────────────────────────────────┘
     │                      │
     │                      │
┌────▼──────────┐    ┌──────▼──────────┐    ┌──────────────┐
│   MySQL       │    │   ChromaDB       │    │  Python      │
│   Database    │    │   Vector Store   │    │  FastAPI     │
│               │    │                  │    │  Service     │
│ - Users       │    │ - Embeddings     │    │              │
│ - Metrics     │    │ - Documents      │    │ - Review     │
│ - Hotels      │    │ - Metadata       │    │   Search     │
│ - Sessions    │    │                  │    │              │
└───────────────┘    └──────────────────┘    └──────────────┘
     │                      │                      │
     │                      │                      │
     └──────────────────────┴──────────────────────┘
                    │
                    │
         ┌──────────▼──────────┐
         │   OpenAI API         │
         │   - GPT-4o           │
         │   - Embeddings       │
         └──────────────────────┘
```

### Architecture Patterns
- **MVC Pattern**: Clear separation between routes, controllers, and data models
- **Microservices Approach**: Separate Python service for review search
- **RESTful API Design**: Standard HTTP methods and status codes
- **Session-Based Authentication**: Using Express sessions with MySQL store
- **Vector Database**: ChromaDB for semantic search and RAG (Retrieval Augmented Generation)

---

## Technology Stack

### Frontend Technologies
- **React 18.3.1**: Modern React with hooks and context API
- **Vite 5.3.1**: Fast build tool and dev server
- **React Router DOM 6.24.0**: Client-side routing
- **TailwindCSS 3.4.4**: Utility-first CSS framework
- **Recharts 2.15.3**: Charting library for data visualization
- **Axios 1.7.2**: HTTP client for API calls
- **React DatePicker 8.7.0**: Date selection component
- **React Icons 5.5.0**: Icon library

### Backend Technologies
- **Node.js**: JavaScript runtime
- **Express.js 4.19.2**: Web application framework
- **MySQL2 3.10.1**: MySQL database driver with promise support
- **ChromaDB 1.5.7**: Vector database client
- **OpenAI SDK 4.49.1**: GPT-4o and embeddings API
- **Passport.js 0.7.0**: Authentication middleware
- **Passport Google OAuth20 2.0.0**: Google OAuth strategy
- **Express Session 1.18.0**: Session management
- **Express MySQL Session 3.0.3**: MySQL session store
- **Multer 1.4.5**: File upload handling
- **XLSX 0.18.5**: Excel file parsing
- **CSV Parser 3.0.0**: CSV file parsing
- **Dotenv 16.4.5**: Environment variable management

### Python Service
- **FastAPI**: Modern Python web framework
- **Uvicorn**: ASGI server
- **ChromaDB**: Vector database for review embeddings
- **OpenAI Python SDK**: For embeddings and GPT models
- **Python-dotenv**: Environment configuration

### Infrastructure & DevOps
- **Docker**: Containerization for ChromaDB
- **AWS EC2**: Cloud hosting for ChromaDB service
- **MySQL**: Relational database
- **ChromaDB**: Vector database (Dockerized)

---

## Backend Architecture

### Project Structure
```
stayora-backend/
├── config/
│   ├── auth.js          # Passport.js Google OAuth configuration
│   ├── chroma.js        # ChromaDB client initialization
│   └── db.js            # MySQL connection pool
├── controllers/
│   ├── aiController.js  # AI chat and review insights
│   ├── dashboardController.js  # Role-specific dashboard data
│   ├── queryController.js       # Text-to-SQL conversion
│   └── strategyController.js    # Strategy page endpoints
├── middleware/
│   └── auth.js          # Authentication & authorization middleware
├── routes/
│   ├── ai.js            # AI-related routes
│   ├── auth.js          # Authentication routes
│   ├── dashboard.js    # Dashboard data routes
│   ├── query.js         # Query routes
│   ├── strategy.js      # Strategy routes
│   ├── data.js          # Data upload routes
│   ├── hotels.js        # Hotel management routes
│   ├── prompts.js       # Prompt library routes
│   └── users.js         # User management routes
├── utils/
│   └── dataProcessor.js # Data parsing and embedding generation
├── scripts/
│   └── migrate-data.js  # Data migration utilities
├── review_search_service.py  # Python FastAPI service
├── schema.sql           # Database schema
└── server.js           # Express app entry point
```

### Core Backend Components

#### 1. Server Configuration (`server.js`)
- Express app initialization
- CORS configuration for frontend communication
- Session management with MySQL store
- Passport.js middleware integration
- Route registration
- Port configuration (default: 5000)

#### 2. Database Configuration (`config/db.js`)
- MySQL connection pool with connection limits
- Environment-based configuration
- Connection health checking
- Graceful error handling

#### 3. ChromaDB Configuration (`config/chroma.js`)
- ChromaDB client initialization
- Connection heartbeat verification
- Environment-based host configuration
- Error handling and logging

#### 4. Authentication (`config/auth.js`)
- Google OAuth 2.0 strategy configuration
- User serialization/deserialization
- Automatic user creation on first login
- Role assignment (default: 'user')

### Controller Layer

#### AI Controller (`controllers/aiController.js`)
**Functions:**
- `getAiChatResponse`: Main AI chat handler
  - Performs semantic search in ChromaDB
  - Expands context by date
  - Synthesizes answer with GPT-4o
  - Saves interaction history
  
- `getReviewInsights`: Review-based Q&A
  - Queries Python FastAPI service
  - Retrieves relevant reviews
  - Generates insights with GPT-4o

**Key Features:**
- Two-step retrieval: Initial search + context expansion
- Date-based context aggregation
- Conversation history tracking
- Error handling and fallbacks

#### Dashboard Controller (`controllers/dashboardController.js`)
**Role-Specific Handlers:**
- `getGmDashboardData`: General Manager dashboard
- `getOwnerDashboardData`: Owner/Asset Manager dashboard
- `getFinanceDashboardData`: Finance Director dashboard
- `getCommercialDashboardData`: Commercial Director dashboard
- `getFnbDashboardData`: F&B Manager dashboard
- `getMarketingDashboardData`: Marketing Manager dashboard

**Common Features:**
- Time range filtering (daily, weekly, monthly, 6-monthly, yearly)
- Date-specific queries
- KPI aggregation
- Chart data preparation
- Unique component data per role

#### Query Controller (`controllers/queryController.js`)
**Text-to-SQL Pipeline:**
1. **SQL Generation**: Converts natural language to SQL using GPT-4o
2. **Query Execution**: Safely executes SELECT-only queries
3. **Natural Language Summary**: Converts results back to readable format

**Security Measures:**
- Only SELECT queries allowed
- Query validation before execution
- Error handling for invalid queries
- Role-aware prompt engineering

### Middleware Layer

#### Authentication Middleware (`middleware/auth.js`)
- `ensureAuthenticated`: Verifies user session
- `ensureSuperadmin`: Restricts to superadmin role
- `ensureRoles`: Factory function for role-based access control

**Usage:**
```javascript
router.get('/dashboard', ensureAuthenticated, getDashboardData);
router.get('/admin', ensureSuperadmin, getAdminData);
router.get('/finance', ensureRoles(['finance', 'superadmin']), getFinanceData);
```

### Data Processing Utilities (`utils/dataProcessor.js`)

#### Key Functions:
1. **`parseCsv(buffer)`**: Parses CSV files using streams
2. **`parseXlsx(buffer)`**: Parses Excel files with multiple sheets
3. **`generateEmbeddings(input)`**: Batch embedding generation
   - Handles single strings or arrays
   - Batch processing (1000 items per batch)
   - Error handling and retry logic
4. **`processAndEmbedData(rawData, hotelId)`**: Complete data pipeline
   - Converts metrics to document format
   - Generates embeddings
   - Prepares ChromaDB upsert format

**Embedding Strategy:**
- Each metric becomes a separate document
- Format: "For hotel {hotelId} on date {date}, the value for {metric} was {value}"
- Events formatted with type, title, description, recommendation
- Metadata includes hotel_id, date, type, metric_name

---

## Frontend Architecture

### Project Structure
```
stayora-frontend/
├── src/
│   ├── components/
│   │   ├── Chat.jsx                    # AI chat interface
│   │   ├── Dashboard components        # Reusable dashboard components
│   │   ├── ErrorBoundary.jsx          # Error handling
│   │   ├── PrivateRoute.jsx           # Route protection
│   │   ├── SideNav.jsx                # Navigation sidebar
│   │   └── TopNav.jsx                 # Top navigation bar
│   ├── context/
│   │   └── AuthContext.jsx            # Authentication state management
│   ├── pages/
│   │   ├── Dashboard.jsx              # Main dashboard page
│   │   ├── Login.jsx                  # Login page
│   │   ├── Welcome.jsx               # Welcome page
│   │   ├── CostManagement.jsx        # CMI page
│   │   ├── admin/                    # Admin pages
│   │   └── strategy/                 # Strategy pages
│   ├── services/
│   │   ├── aiService.js              # AI API calls
│   │   └── mockApi.js                # Mock data for development
│   ├── utils/
│   │   └── strategyAccess.js         # Role-based access utilities
│   └── mockData/                     # Mock data files
├── App.jsx                           # Main app component
├── main.jsx                         # Entry point
├── vite.config.js                   # Vite configuration
└── tailwind.config.js               # TailwindCSS configuration
```

### Key Frontend Components

#### 1. App Component (`App.jsx`)
- React Router setup
- Route definitions
- Layout wrapper (SideNav + TopNav)
- Private route protection
- Role-based route access

**Route Structure:**
- `/login`: Public login page
- `/welcome`: Welcome page
- `/dashboard`: Main dashboard (protected)
- `/chat`: AI chat interface (protected)
- `/cmi`: Cost Management Index (protected)
- `/strategy/*`: Strategy pages (protected)
- `/admin/*`: Admin pages (superadmin only)

#### 2. Dashboard Component (`pages/Dashboard.jsx`)
**Features:**
- Role-based data fetching
- Time range selection (daily, weekly, monthly, etc.)
- Date picker for specific dates
- Multi-section dashboard toggle
- Real-time data updates
- KPI cards with trend indicators
- Chart visualization (line, bar, pie)
- Role-specific unique components

**State Management:**
- `selectedRole`: Current role view (for superadmin)
- `selectedRange`: Time range filter
- `selectedDate`: Specific date selection
- `dashboardData`: Fetched dashboard data
- `useMultiSection`: Dashboard view toggle

**Data Flow:**
1. User selects role/range/date
2. API call to `/api/dashboard?role=X&range=Y`
3. Backend fetches role-specific data
4. Frontend renders KPIs, charts, and components

#### 3. Chat Component (`components/Chat.jsx`)
**Dual Tab Interface:**
- **AI Chat Tab**: Text-to-SQL queries
- **Review Insights Tab**: Guest review analysis

**Features:**
- Prompt library integration
- Message history
- Loading states
- Error handling
- Auto-scroll to latest message
- Debounced search for prompts
- Category filtering

**State Management:**
- Separate state for each tab
- Message arrays
- Loading flags
- Input refs for focus management
- Modal visibility states

**API Integration:**
- `/api/query/sql`: Text-to-SQL endpoint
- `/api/ai/review-insights`: Review search endpoint
- `/api/prompts`: Prompt library endpoint

#### 4. Authentication Context (`context/AuthContext.jsx`)
**Features:**
- User state management
- Authentication status checking
- Login/logout functions
- Session persistence
- Automatic redirect on auth state change

**Implementation:**
- Uses React Context API
- Axios configured with credentials
- Checks `/auth/current_user` on mount
- Provides user object to all components

### Component Patterns

#### 1. Reusable Dashboard Components
- `KpiCard`: Displays KPI with trend indicators
- `MainChart`: Wrapper for Recharts components
- `DailyBriefing`: GM-specific operational briefing
- `AssetSnapshot`: Owner-specific asset information
- `FinancialStatements`: Finance-specific P&L view
- `MarketPacingView`: Commercial-specific market analysis

#### 2. Error Handling
- `ErrorBoundary`: Catches React component errors
- API error handling with user-friendly messages
- Loading states for async operations
- Fallback UI for missing data

#### 3. Responsive Design
- TailwindCSS utility classes
- Mobile-first approach
- Flexible grid layouts
- Responsive navigation

---

## Database Design

### Schema Overview

#### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role ENUM('superadmin', 'gm', 'finance', 'owner', 
              'asset_manager', 'commercial', 'corporate', 'user') 
         DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Purpose**: User authentication and role management
**Key Fields**:
- `google_id`: Unique Google OAuth identifier
- `role`: Role-based access control
- `email`: User email (unique)

#### Hotels Table
```sql
CREATE TABLE hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id VARCHAR(255) UNIQUE NOT NULL,
    hotel_name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose**: Hotel/property management
**Key Fields**:
- `hotel_id`: Identifier used for ChromaDB collections
- `hotel_name`: Human-readable hotel name

#### Daily Metrics Table
```sql
CREATE TABLE daily_metrics (
    hotel_id VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    occupancy_rate DECIMAL(5, 4),
    adr DECIMAL(10, 2),
    revpar DECIMAL(10, 2),
    gop DECIMAL(12, 2),
    ebitda DECIMAL(12, 2),
    nop DECIMAL(12, 2),
    total_revenue DECIMAL(12, 2),
    total_expenses DECIMAL(12, 2),
    rooms_revenue DECIMAL(12, 2),
    fnb_revenue DECIMAL(12, 2),
    other_revenue DECIMAL(12, 2),
    rooms_labor_exp DECIMAL(10, 2),
    fnb_labor_exp DECIMAL(10, 2),
    utilities_exp DECIMAL(10, 2),
    admin_exp DECIMAL(10, 2),
    labor_cost_percent DECIMAL(5, 4),
    guest_sentiment DECIMAL(4, 2),
    maintenance_requests_count INT,
    housekeeping_performance_percent DECIMAL(5, 4),
    front_desk_efficiency_percent DECIMAL(5, 4)
);
```

**Purpose**: Core operational metrics storage
**Key Metrics**:
- Revenue metrics: ADR, RevPAR, total revenue
- Financial metrics: GOP, EBITDA, NOP
- Operational metrics: Occupancy, labor costs
- Guest metrics: Sentiment scores
- Performance metrics: Housekeeping, front desk efficiency

#### Marketing Metrics Table
```sql
CREATE TABLE marketing_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    bookings_direct INT,
    bookings_ota INT,
    bookings_corporate INT,
    website_visitors INT,
    website_conversion_rate DECIMAL(5, 4),
    campaign_roas_google DECIMAL(5, 2),
    campaign_roas_social DECIMAL(5, 2),
    avg_review_score_tripadvisor DECIMAL(4, 2),
    avg_review_score_google DECIMAL(4, 2),
    social_followers_instagram INT,
    social_engagement_rate DECIMAL(5, 4),
    UNIQUE KEY unique_hotel_date (hotel_id, date)
);
```

**Purpose**: Marketing and channel performance tracking

#### F&B Metrics Table
```sql
CREATE TABLE fnb_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    restaurant_revenue DECIMAL(10, 2),
    bar_revenue DECIMAL(10, 2),
    room_service_revenue DECIMAL(10, 2),
    food_cost_percent DECIMAL(5, 4),
    beverage_cost_percent DECIMAL(5, 4),
    spoilage_cost DECIMAL(8, 2),
    avg_check_size DECIMAL(8, 2),
    fnb_guest_sentiment DECIMAL(4, 2),
    UNIQUE KEY unique_hotel_date (hotel_id, date)
);
```

**Purpose**: Food & Beverage department metrics

#### Prompt Library Table
```sql
CREATE TABLE prompt_library (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    prompt_text VARCHAR(255) NOT NULL
);
```

**Purpose**: Pre-defined prompts for AI chat

#### Sessions Table
- Managed by `express-mysql-session`
- Stores session data for authentication
- Automatic expiration handling

### Database Relationships
- **Users → Hotels**: Many-to-many (via roles and permissions)
- **Hotels → Daily Metrics**: One-to-many
- **Hotels → Marketing Metrics**: One-to-many
- **Hotels → F&B Metrics**: One-to-many

### Indexing Strategy
- Primary keys on all tables
- Unique constraints on `hotel_id + date` combinations
- Foreign key relationships (implicit)
- Date-based queries optimized with date indexes

---

## AI/ML Integration

### OpenAI Integration

#### 1. GPT-4o for Text-to-SQL
**Endpoint**: `/api/query/sql`

**Process:**
1. User submits natural language question
2. System prompt includes:
   - Database schema
   - User role context
   - Query generation instructions
3. GPT-4o generates SQL query
4. Query validation (SELECT-only)
5. Query execution
6. Results converted to natural language

**Prompt Engineering:**
- Role-aware prompts
- Schema context included
- Temperature: 0 (deterministic SQL)
- Error handling for invalid queries

#### 2. GPT-4o for Chat Responses
**Endpoint**: `/api/ai/query`

**Process:**
1. User question embedded
2. Semantic search in ChromaDB (top 10 results)
3. Extract relevant dates from results
4. Fetch all documents for those dates
5. Format context for GPT-4o
6. Generate response with context
7. Save to chat history

**RAG Implementation:**
- Retrieval: ChromaDB semantic search
- Augmentation: Date-based context expansion
- Generation: GPT-4o synthesis

#### 3. Embeddings (text-embedding-ada-002)
**Usage:**
- Document embeddings for ChromaDB
- Query embeddings for semantic search
- Batch processing (1000 items per batch)

**Embedding Generation:**
- Metrics: "For hotel X on date Y, metric Z was value"
- Events: "On date Y, event type X occurred: description"
- Reviews: Full review text embedded

### ChromaDB Vector Database

#### Collection Structure
- **Collection Name**: `hotel-{hotelId}`
- **Documents**: Formatted metric/event descriptions
- **Metadata**: hotel_id, date, type, metric_name
- **Embeddings**: OpenAI ada-002 embeddings

#### Query Process
1. Generate query embedding
2. Search with `nResults` parameter
3. Retrieve documents and metadata
4. Expand context by date
5. Return relevant documents

#### Data Storage
- Persistent storage on disk
- Docker volume for data persistence
- AWS EC2 deployment for production

### Python FastAPI Service

#### Purpose
- Separate service for review search
- Handles large review datasets
- Optimized for semantic search

#### Endpoints
- `GET /search_reviews`: Search reviews by question
  - Parameters: `question`, `top_k`
  - Returns: Relevant reviews with metadata

#### Features
- Automatic review loading on startup
- Batch embedding generation
- ChromaDB collection management
- CORS configuration for frontend

---

## Authentication & Authorization

### Authentication Flow

#### Google OAuth 2.0
1. User clicks "Login with Google"
2. Redirect to `/auth/google`
3. Google OAuth consent screen
4. Callback to `/auth/google/callback`
5. Passport.js verifies token
6. User lookup/creation in database
7. Session creation
8. Redirect to dashboard

#### Session Management
- **Store**: MySQL session store
- **Duration**: 24 hours
- **Security**: HttpOnly cookies
- **Production**: Secure flag enabled

### Authorization Model

#### Role Hierarchy
1. **superadmin**: Full system access
   - All dashboards
   - User management
   - Hotel management
   - Data upload
   - Role switching

2. **gm**: General Manager
   - GM dashboard
   - Operational metrics
   - Staff performance

3. **finance**: Finance Director
   - Finance dashboard
   - Financial metrics
   - Budget analysis

4. **owner**: Owner/Asset Manager
   - Owner dashboard
   - Portfolio metrics
   - Asset valuation

5. **commercial**: Commercial Director
   - Commercial dashboard
   - Revenue metrics
   - Market analysis

6. **fnb**: F&B Manager
   - F&B dashboard
   - Restaurant metrics

7. **marketing**: Marketing Manager
   - Marketing dashboard
   - Campaign metrics

8. **user**: Default role
   - Limited access

### Middleware Implementation

#### `ensureAuthenticated`
- Checks `req.isAuthenticated()`
- Returns 401 if not authenticated
- Used on all protected routes

#### `ensureSuperadmin`
- Checks user role === 'superadmin'
- Returns 403 if not authorized
- Used on admin routes

#### `ensureRoles`
- Factory function
- Accepts array of allowed roles
- Flexible role-based access control

### Frontend Route Protection

#### PrivateRoute Component
- Wraps protected routes
- Checks authentication status
- Redirects to login if not authenticated
- Supports `allowedRoles` prop

**Usage:**
```jsx
<Route element={<PrivateRoute allowedRoles={['superadmin']} />}>
  <Route path="/admin/users" element={<UserManagement />} />
</Route>
```

---

## API Architecture

### API Endpoints Overview

#### Authentication Routes (`/auth`)
- `GET /auth/google`: Initiate Google OAuth
- `GET /auth/google/callback`: OAuth callback
- `GET /auth/logout`: Logout user
- `GET /auth/current_user`: Get current user

#### Dashboard Routes (`/api/dashboard`)
- `GET /api/dashboard`: Get role-specific dashboard
  - Query params: `role`, `range`, `date`
- `GET /api/dashboard/dates`: Get available dates

#### AI Routes (`/api/ai`)
- `POST /api/ai/query`: AI chat query
  - Body: `{ prompt, hotelId }`
- `POST /api/ai/review-insights`: Review search
  - Body: `{ question, top_k }`

#### Query Routes (`/api/query`)
- `POST /api/query/sql`: Text-to-SQL conversion
  - Body: `{ question, userRole }`

#### Strategy Routes (`/api/strategy`)
- `GET /api/strategy/forecast/5y`: 5-year forecast
- `GET /api/strategy/budget/generate`: Generate budget
- `GET /api/strategy/esg/summary`: ESG summary
- `POST /api/strategy/proforma/build`: Build pro forma
- `GET /api/strategy/rate/recommend`: Rate recommendations
- `GET /api/strategy/sentiment`: Team sentiment

#### Data Routes (`/api/data`)
- `POST /api/data/upload`: Upload data files
- `GET /api/data/hotels`: List hotels

#### User Routes (`/api/users`)
- `GET /api/users`: List users (admin)
- `PUT /api/users/:id`: Update user (admin)

#### Prompt Routes (`/api/prompts`)
- `GET /api/prompts`: Get prompts
  - Query params: `category`, `search`

### API Response Format

#### Success Response
```json
{
  "response": "Answer text",
  "data": {...},
  "kpis": [...],
  "charts": {...}
}
```

#### Error Response
```json
{
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

### API Security
- All routes require authentication (except `/auth/*`)
- CORS configured for frontend origin
- SQL injection prevention (parameterized queries)
- Input validation on all endpoints
- Rate limiting (future enhancement)

---

## Data Processing Pipeline

### Data Upload Flow

#### 1. File Upload
- Accepts CSV or XLSX files
- Multer middleware handles upload
- File validation (type, size)

#### 2. File Parsing
- **CSV**: Stream-based parsing with csv-parser
- **XLSX**: Sheet-based parsing with xlsx library
- Extracts metrics and events

#### 3. Data Transformation
- Converts rows to document format
- Adds hotel_id context
- Formats dates consistently

#### 4. Embedding Generation
- Batch processing (1000 items)
- OpenAI embeddings API
- Error handling and retries

#### 5. ChromaDB Storage
- Creates/updates collection
- Upserts documents with embeddings
- Stores metadata for filtering

### Real-Time Data Updates

#### Update Sources
- Manual uploads
- API integrations (future)
- Scheduled imports (future)

#### Update Process
1. New data arrives
2. Parse and validate
3. Generate embeddings
4. Upsert to ChromaDB
5. Update MySQL metrics
6. Invalidate cache (if implemented)

### Data Aggregation

#### Time-Based Aggregation
- Daily: Single day metrics
- Weekly: 7-day rolling window
- Monthly: 30-day period
- 6-Monthly: Monthly aggregates
- Yearly: Monthly aggregates

#### Metric Aggregation
- SUM: Revenue, expenses
- AVG: Rates, percentages
- MAX/MIN: Peak values
- COUNT: Event counts

---

## Deployment & Infrastructure

### Development Environment

#### Local Setup
1. **Backend**:
   - Node.js 18+
   - MySQL database
   - ChromaDB (Docker)
   - Python service (optional)

2. **Frontend**:
   - Node.js 18+
   - Vite dev server
   - Hot module replacement

3. **Environment Variables**:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=stayora
   SESSION_SECRET=secret
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   OPENAI_API_KEY=...
   CHROMADB_HOST=http://localhost:8000
   ```

### Production Deployment

#### AWS EC2 Setup
- **Instance Type**: t3.micro (free tier) or t3.small
- **OS**: Ubuntu 22.04 LTS
- **ChromaDB**: Docker container
- **Ports**: 8000 (ChromaDB), 5000 (Backend)

#### Deployment Scripts
- `ec2-setup-t2micro.sh`: Setup script for EC2
- `ec2-setup-t3nano.sh`: Alternative setup
- `migrate-data.py`: Data migration utility

#### Deployment Process
1. Launch EC2 instance
2. Install Docker
3. Deploy ChromaDB container
4. Configure security groups
5. Migrate data from local
6. Update environment variables
7. Deploy backend (PM2 or similar)
8. Configure reverse proxy (Nginx)

### Database Deployment

#### MySQL
- Production MySQL instance
- Connection pooling
- Backup strategy
- Replication (future)

#### ChromaDB
- Docker container
- Persistent volume
- Backup scripts
- Monitoring

### Monitoring & Logging

#### Current Implementation
- Console logging
- Error tracking
- Database query logging

#### Future Enhancements
- CloudWatch integration
- Sentry for error tracking
- Performance monitoring
- Usage analytics

---

## Security Implementation

### Authentication Security
- **OAuth 2.0**: Industry-standard authentication
- **Session Management**: Secure session storage
- **HttpOnly Cookies**: Prevents XSS attacks
- **Secure Cookies**: HTTPS-only in production

### API Security
- **Authentication Required**: All protected routes
- **Role-Based Access**: Middleware enforcement
- **Input Validation**: All user inputs validated
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Restricted origins

### Data Security
- **Environment Variables**: Sensitive data in .env
- **Database Credentials**: Encrypted connections
- **API Keys**: Stored securely, never exposed
- **Data Isolation**: Hotel-specific data separation

### Frontend Security
- **XSS Prevention**: React's built-in escaping
- **CSRF Protection**: SameSite cookies
- **Route Protection**: PrivateRoute component
- **Input Sanitization**: User input validation

### Security Best Practices
- Regular dependency updates
- Security audit tools (future)
- Penetration testing (future)
- Security headers (future)

---

## Performance Optimizations

### Backend Optimizations

#### Database
- **Connection Pooling**: Reuse connections
- **Query Optimization**: Indexed queries
- **Batch Operations**: Bulk inserts/updates
- **Caching**: Future Redis integration

#### API Response
- **Efficient Queries**: Optimized SQL
- **Pagination**: Large result sets
- **Compression**: Gzip compression (future)
- **CDN**: Static asset delivery (future)

#### Embedding Generation
- **Batch Processing**: 1000 items per batch
- **Parallel Processing**: Multiple batches
- **Caching**: Embedding cache (future)

### Frontend Optimizations

#### React Performance
- **Memoization**: React.memo for components
- **Code Splitting**: Route-based splitting
- **Lazy Loading**: Component lazy loading
- **Virtual Scrolling**: Large lists (future)

#### Bundle Optimization
- **Tree Shaking**: Remove unused code
- **Minification**: Production builds
- **Asset Optimization**: Image compression
- **Chunk Splitting**: Optimal bundle sizes

#### Network Optimization
- **Request Debouncing**: Search inputs
- **Request Caching**: API response caching
- **Prefetching**: Anticipated data loads
- **Compression**: Gzip/Brotli

### ChromaDB Optimizations
- **Collection Indexing**: Optimized queries
- **Batch Operations**: Bulk upserts
- **Connection Pooling**: Reuse connections
- **Caching**: Query result caching

---

## Key Features & Capabilities

### 1. Multi-Role Dashboard System

#### Role-Specific Views
- **GM Dashboard**: Operational metrics, guest satisfaction, staff performance
- **Finance Dashboard**: Financial metrics, P&L, cost analysis
- **Owner Dashboard**: Portfolio metrics, asset valuation, ROI
- **Commercial Dashboard**: Revenue metrics, market analysis, pricing
- **F&B Dashboard**: Restaurant metrics, food costs, guest sentiment
- **Marketing Dashboard**: Campaign metrics, conversion rates, reviews

#### Dashboard Features
- Real-time KPI cards
- Interactive charts (line, bar, pie)
- Time range filtering
- Date-specific queries
- Role-specific components
- Export functionality (future)

### 2. AI-Powered Chat Interface

#### Text-to-SQL
- Natural language to SQL conversion
- Role-aware query generation
- Natural language results
- Query history tracking

#### Semantic Search
- ChromaDB vector search
- Context expansion by date
- GPT-4o synthesis
- Conversation history

#### Review Insights
- Guest review search
- Sentiment analysis
- Topic extraction
- Actionable insights

### 3. Advanced Filtering System

#### Filter Dimensions
- **Department**: Rooms, F&B, Spa, Events, Marketing, Finance, Operations
- **Metric**: Revenue, Occupancy, ADR, RevPAR, GOP, Sentiment, Labor Cost
- **Hotel**: Multi-property support
- **Guest Type**: Leisure, Business, Corporate, Group, VIP
- **Revenue Range**: CHF 0-50K, 50K-100K, 100K-500K, 500K+
- **Occupancy Range**: 0-25%, 25-50%, 50-75%, 75-100%

### 4. Strategy Pages

#### 5-Year Forecast
- Base, optimistic, conservative scenarios
- ADR, occupancy, RevPAR projections
- Revenue and expense forecasting

#### Budget Generation
- Monthly budget breakdown
- Department-wise allocation
- Variance analysis

#### ESG Summary
- Sustainability metrics
- Energy consumption
- Water usage
- Waste management
- Action recommendations

#### Pro Forma Builder
- Interactive financial modeling
- Parameter adjustment
- Real-time calculations
- Scenario analysis

#### Rate Recommendations
- Occupancy-based pricing
- Competitive analysis
- Market positioning
- Revenue optimization

#### Team Sentiment
- Employee satisfaction metrics
- Topic analysis
- Trend tracking

### 5. Admin Capabilities

#### User Management
- User listing
- Role assignment
- User editing
- Access control

#### Hotel Management
- Hotel creation
- Hotel editing
- Multi-property support

#### Data Upload
- CSV/XLSX upload
- Data validation
- Automatic processing
- Error reporting

---

## Development Workflow

### Project Setup

#### Backend Setup
```bash
cd stayora-backend
npm install
cp .env.example .env
# Configure .env file
npm run dev
```

#### Frontend Setup
```bash
cd stayora-frontend
npm install
cp .env.example .env
# Configure .env file
npm run dev
```

#### Python Service Setup
```bash
cd stayora-backend
pip install -r requirements.txt
uvicorn review_search_service:app --reload
```

### Development Tools
- **nodemon**: Auto-restart backend
- **Vite HMR**: Hot module replacement
- **ESLint**: Code linting
- **Prettier**: Code formatting (future)

### Git Workflow
- Feature branches
- Pull requests
- Code reviews
- Main branch protection

### Testing Strategy
- Unit tests (future)
- Integration tests (future)
- E2E tests (future)
- Manual testing (current)

### Code Quality
- Consistent code style
- Error handling
- Logging
- Documentation

---

## Future Enhancements

### Short-Term (Next 3 Months)
1. **Enhanced AI Chat**
   - Conversation memory
   - Multi-turn conversations
   - Context awareness

2. **Additional Data Sources**
   - Weather data integration
   - Event calendar integration
   - Economic indicators

3. **Mobile Optimization**
   - Responsive design improvements
   - Mobile app (React Native)

4. **Advanced Analytics**
   - Machine learning models
   - Predictive insights
   - Anomaly detection

### Medium-Term (Next Year)
1. **Multi-Property Support**
   - Scale to 50+ hotels
   - Portfolio-level analytics
   - Cross-property comparisons

2. **International Expansion**
   - Multi-currency support
   - Multi-language support
   - Regional customization

3. **API Integration**
   - PMS integration
   - Channel manager integration
   - Payment gateway integration

4. **White-Label Solutions**
   - Customizable branding
   - Configurable dashboards
   - Custom metrics

### Long-Term (Next 3 Years)
1. **Industry Standard**
   - Market leadership
   - Industry partnerships
   - Certification programs

2. **Global Expansion**
   - Worldwide hotel support
   - Regional data centers
   - Local compliance

3. **Advanced AI**
   - Predictive analytics
   - Automated decision-making
   - Natural language generation

4. **Ecosystem Integration**
   - Supplier networks
   - Vendor integrations
   - Partner APIs

---

## Technical Challenges & Solutions

### Challenge 1: Real-Time Data Processing
**Problem**: Need to process and display data in real-time
**Solution**: 
- Efficient database queries
- Optimized API endpoints
- Frontend polling/WebSocket (future)

### Challenge 2: Semantic Search Accuracy
**Problem**: Finding relevant documents for user queries
**Solution**:
- Two-step retrieval (initial search + context expansion)
- Date-based context aggregation
- Fine-tuned embedding strategies

### Challenge 3: Multi-Role Dashboard Complexity
**Problem**: Different data views for different roles
**Solution**:
- Role-based controller functions
- Flexible query parameters
- Reusable component library

### Challenge 4: Text-to-SQL Reliability
**Problem**: Generating accurate SQL from natural language
**Solution**:
- Role-aware prompts
- Schema context inclusion
- Query validation
- Error handling and fallbacks

### Challenge 5: Scalability
**Problem**: Handling large datasets and multiple hotels
**Solution**:
- Connection pooling
- Batch processing
- Efficient indexing
- Future: Horizontal scaling, caching

---

## Conclusion

Stayora represents a comprehensive hotel intelligence platform that combines modern web technologies, AI/ML capabilities, and industry-specific domain knowledge. The architecture is designed for scalability, maintainability, and extensibility, with clear separation of concerns and robust error handling.

### Key Technical Achievements
- **Hybrid Architecture**: Combines relational (MySQL) and vector (ChromaDB) databases
- **AI Integration**: Seamless integration of GPT-4o for multiple use cases
- **Role-Based System**: Flexible authorization and personalized experiences
- **Real-Time Processing**: Efficient data processing and display
- **Scalable Design**: Architecture supports growth and expansion

### Technical Strengths
- Clean code structure
- Comprehensive error handling
- Security best practices
- Performance optimizations
- Extensible architecture

### Areas for Growth
- Testing coverage
- Monitoring and observability
- Documentation
- Performance optimization
- Feature expansion

---

*This document provides a comprehensive technical overview of the Stayora platform. For specific implementation details, refer to the source code and inline documentation.*

