# DomainFlow - Complete Technical Summary

## Executive Overview

**DomainFlow** is a comprehensive, AI-powered domain modeling and use case documentation platform designed to assist business analysts and software engineers in creating, managing, and visualizing complex domain models, use cases, and system requirements. The application leverages advanced AI models (OpenAI GPT-4o and Google Gemini) to automate the generation of domain entities, relationships, use cases, personas, features, and various documentation artifacts.

---

## 1. Project Architecture

### 1.1 Technology Stack

#### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.2.0
- **UI Library**: Material-UI (MUI) 5.15.0
- **Routing**: React Router DOM 7.6.3
- **Canvas/Drawing**: Konva 9.3.0 + React-Konva 18.0.7
- **Notifications**: Notistack 2.0.8
- **Styling**: Emotion (CSS-in-JS)

#### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 4.18.2
- **Database**: MySQL 8.0 (AWS RDS)
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3
- **File Upload**: Multer 1.4.5-lts.1
- **HTTP Client**: Axios 1.6.8
- **Logging**: Morgan 1.10.0

#### AI Integration
- **OpenAI API**: GPT-4o model for domain modeling, type combinations, and Lean Canvas generation
- **Google Gemini API**: Gemini 1.5 Pro for use case generation (actors, inputs, outputs, preconditions, postconditions, triggers)

#### Infrastructure
- **Database Host**: AWS RDS MySQL (ap-south-1 region)
- **Deployment**: Single-page application (SPA) architecture
- **Port**: 4000 (backend), Vite dev server (frontend)

---

## 2. System Architecture & Design Patterns

### 2.1 Application Structure

```
DomainFlow/
├── backend/
│   ├── index.js              # Main Express server
│   ├── routes/
│   │   ├── auth.js          # Authentication & user management
│   │   ├── domain.js        # Domain entities, types, relationships
│   │   ├── ucd.js           # UCD (Lean Canvas, Personas, Features)
│   │   └── domain-usecases.js # Domain-level use cases
│   └── public/               # Built frontend assets
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main app component with routing
│   │   ├── ProjectList.jsx  # Project listing page
│   │   ├── ProjectWorkspace.jsx # Main workspace container
│   │   ├── components/      # Reusable UI components
│   │   └── [Feature Components] # Domain/UCD/UseCase components
│   └── vite.config.js
└── [Database SQL files]
```

### 2.2 Design Patterns

1. **RESTful API Architecture**: All backend endpoints follow REST conventions
2. **Component-Based Frontend**: React functional components with hooks
3. **Separation of Concerns**: Clear separation between routes, business logic, and data access
4. **Middleware Pattern**: Express middleware for authentication, CORS, logging
5. **Connection Pooling**: MySQL connection pool for efficient database access
6. **Transaction Management**: Database transactions for atomic operations

---

## 3. Core Features & Modules

### 3.1 Authentication & Authorization

**Implementation**: JWT-based authentication with role-based access control (RBAC)

**Features**:
- User login/logout with JWT tokens (7-day expiration)
- Password hashing using bcrypt (10 rounds)
- Role-based access: `admin` and `user` roles
- Password change enforcement for new users
- Admin user management (create/delete users)
- Session persistence across browser restarts

**Database Schema**:
```sql
auth_users (
  id, username, password (hashed), role, 
  created_at, password_changed
)
```

**Key Endpoints**:
- `POST /api/auth/login` - User authentication
- `POST /api/auth/change-password` - Password management
- `GET /api/auth/me` - Current user info
- `GET /api/auth/users` - List users (admin only)
- `POST /api/auth/users` - Create user (admin only)
- `DELETE /api/auth/users/:userId` - Delete user (admin only)
```

**Security Features**:
- Password hashing prevents plaintext storage
- JWT tokens for stateless authentication
- Protected routes via middleware
- Admin-only endpoints with role verification
- Default password enforcement on first login

---

### 3.2 Project Management

**Core Entity**: Projects serve as containers for all domain modeling work

**Features**:
- Create, read, update, delete projects
- Project-based data isolation
- Automatic AI generation of Lean Canvas sections on creation
- External systems generation via AI

**Database Schema**:
```sql
projects (
  id, title, description, created_at
)
```

**Key Endpoints**:
- `POST /api/projects` - Create project (triggers AI generation)
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project (cascade deletes related data)
```

---

### 3.3 UCD (User-Centered Design) Module

#### 3.3.1 Lean Canvas Sections

**Purpose**: Business model documentation using Lean Canvas methodology

**Sections**:
- PROBLEM
- CUSTOMER SEGMENTS
- UNIQUE VALUE PROPOSITION
- SOLUTION
- CHANNELS
- REVENUE STREAMS
- COST STRUCTURE
- KEY METRICS
- UNFAIR ADVANTAGE

**Features**:
- AI-powered generation using OpenAI GPT-4o
- Manual editing of section items
- CRUD operations for individual items
- Regeneration with feedback support

**Database Schema**:
```sql
project_sections (
  id, project_id, section, content (JSON), 
  short_explanation, created_at
)
```

**Key Endpoints**:
- `POST /api/projects/:id/sections` - Add section (AI-generated)
- `PUT /api/projects/:id/sections/:sectionId` - Update section
- `DELETE /api/projects/:id/sections/:sectionId` - Delete section
- `POST /api/projects/:id/lean-canvas/ai-generate` - Regenerate all sections
```

#### 3.3.2 Personas (Actors)

**Purpose**: Define user personas with detailed characteristics

**Persona Attributes**:
- Role (e.g., "Customer", "Admin")
- Decision Power (High, Medium, Low)
- Experience Level (Beginner, Intermediate, Advanced)
- Pain Points (array)
- Motivations (array)
- Key Solutions (array)
- Avatar seed (MD5 hash for avatar generation)

**Features**:
- AI generation via Gemini 1.5 Pro
- Manual creation and editing
- Section-based organization (Pain Points, Motivations, Key Solutions)
- Avatar generation based on persona attributes

**Database Schema**:
```sql
personas (
  id, project_id, avatar_seed, role, 
  decision_power, experience_level, created_at
)

persona_sections (
  id, persona_id, section, items (JSON), created_at
)
```

**Key Endpoints**:
- `POST /api/projects/:id/personas/generate` - AI generate personas
- `GET /api/projects/:id/personas` - List personas
- `POST /api/projects/:id/personas` - Create persona
- `PUT /api/personas/:id` - Update persona
- `DELETE /api/personas/:id` - Delete persona
- `GET /api/personas/:id/sections` - Get persona sections
```

#### 3.3.3 Features

**Purpose**: Feature management with MoSCoW prioritization

**Feature Attributes**:
- Title
- Description
- MoSCoW Group (must, should, could, wont)
- Sort Order
- Associated Pages (Understanding, User Persona, Feature List, Product Roadmap)

**Features**:
- AI generation via OpenAI GPT-4o (8-12 features organized by MoSCoW)
- Manual CRUD operations
- Drag-and-drop reordering
- Page assignment for feature organization
- Feature-Feature dependency matrix
- Actor-Feature dependency matrix
- External System-Feature dependency matrix

**Database Schema**:
```sql
features (
  id, project_id, title, description, 
  moscow_group, sort_order
)

feature_pages (
  id, feature_id, page
)

feature_feature_dependencies (
  id, project_id, feature_from_id, feature_to_id, 
  dependency_type (aggregation, composition, association, none)
)

actor_feature_dependencies (
  id, project_id, actor_id, feature_id, dependency_type
)

external_feature_dependencies (
  id, external_system_id, feature_id, dependency_type
)
```

**Key Endpoints**:
- `POST /api/projects/:projectId/features/generate` - AI generate features
- `GET /api/projects/:projectId/features` - List features (grouped by MoSCoW)
- `POST /api/projects/:projectId/features` - Create feature
- `PUT /api/features/:featureId` - Update feature
- `DELETE /api/features/:featureId` - Delete feature
- `POST /api/projects/:projectId/features/reorder` - Reorder features
```

#### 3.3.4 External Systems

**Purpose**: Document external integrations and third-party systems

**Features**:
- AI generation of external systems based on project description
- Manual CRUD operations
- Integration with feature dependency matrices

**Database Schema**:
```sql
external_systems (
  id, project_id, name, description
)
```

**Key Endpoints**:
- `POST /api/projects/:projectId/external-systems/ai-generate` - AI generate
- `GET /api/projects/:projectId/external-systems` - List systems
- `POST /api/projects/:projectId/external-systems` - Create system
- `PUT /api/external-systems/:id` - Update system
- `DELETE /api/external-systems/:id` - Delete system
```

---

### 3.4 Domain Modeling Module

#### 3.4.1 Domain Entities

**Purpose**: Define core business entities in the domain

**Entity Attributes**:
- Name
- Description
- Project ID (for multi-project support)

**Features**:
- Manual CRUD operations
- AI-powered generation from use cases and UCD data
- Integration with entity types and relationships

**Database Schema**:
```sql
entities (
  id, project_id, name, description
)
```

**Key Endpoints**:
- `GET /api/entities?project_id=X` - List entities
- `POST /api/entities` - Create entity
- `PUT /api/entities/:id` - Update entity
- `DELETE /api/entities/:id` - Delete entity
- `POST /api/projects/:projectId/domain/ai-generate` - AI generate domain model
```

#### 3.4.2 Entity Types

**Purpose**: Define attributes, data types, and roles for entities

**Type Attributes**:
- Entity ID (foreign key)
- Name
- Type (attribute, data type, role, etc.)
- Reason (explanation for the type)
- Project ID

**Features**:
- Multiple types per entity
- AI generation ensures at least 5 types per entity
- Manual editing and management

**Database Schema**:
```sql
entity_types (
  id, project_id, entity_id, name, type, reason
)
```

**Key Endpoints**:
- `GET /api/entities/:entityId/types` - List types for entity
- `POST /api/entities/:entityId/types` - Create type
- `PUT /api/types/:id` - Update type
- `DELETE /api/types/:id` - Delete type
```

#### 3.4.3 Relationships

**Purpose**: Define relationships between entities

**Relationship Attributes**:
- Entity1 ID
- Entity2 ID
- Relationship Type (e.g., "has", "belongs to", "references")
- Description
- Project ID

**Features**:
- Bidirectional relationship support
- AI generation based on domain context
- Manual creation and editing

**Database Schema**:
```sql
relationships (
  id, project_id, entity1_id, entity2_id, 
  relationship_type, description
)
```

**Key Endpoints**:
- `GET /api/relationships` - List relationships
- `POST /api/relationships` - Create relationship
- `PUT /api/relationships/:id` - Update relationship
- `DELETE /api/relationships/:id` - Delete relationship
```

#### 3.4.4 DSM (Design Structure Matrix) Relationships

**Purpose**: Advanced relationship modeling with multiplicity

**DSM Attributes**:
- Entity1 ID
- Entity2 ID
- Relationship Type
- Multiplicity From (e.g., "1", "0..1", "*")
- Multiplicity To
- Notes

**Features**:
- Matrix view for visualizing all entity relationships
- Multiplicity constraints
- Duplicate prevention

**Database Schema**:
```sql
dsm_relationships (
  id, entity1_id, entity2_id, relationship_type, 
  multiplicity_from, multiplicity_to, notes
)
```

**Key Endpoints**:
- `GET /api/dsm-matrix` - Get matrix data
- `POST /api/dsm-relationships` - Create DSM relationship
- `PUT /api/dsm-relationships/:id` - Update relationship
- `DELETE /api/dsm-relationships/:id` - Delete relationship
```

#### 3.4.5 Type Combinations

**Purpose**: Generate and validate combinations of entity types using AI

**Features**:
- Cartesian product generation of all type combinations
- AI validation using OpenAI GPT-4o to identify:
  - Special combinations (pricing, eligibility, restrictions)
  - Impossible combinations
- Batch processing (100 combinations per batch)
- User review workflow (pending, approved, rejected)
- Search and filtering capabilities
- Pagination support

**Process Flow**:
1. User selects entities (or uses all)
2. System generates all possible type combinations
3. AI analyzes each batch for special/impossible cases
4. User reviews and approves/rejects combinations
5. Approved combinations can be used for business logic

**Database Schema**:
```sql
type_combinations (
  id, project_id, combination_hash (SHA256), 
  combination_json (JSON), ai_suggestion (special/impossible), 
  ai_confidence (0-1), user_status (pending/approved/rejected), 
  created_at, updated_at
)
```

**Key Endpoints**:
- `POST /api/generate-type-combinations` - Generate combinations
- `GET /api/type-combinations` - List combinations (paginated, filterable)
- `POST /api/type-combinations/approve` - Approve combinations
- `POST /api/type-combinations/reject` - Reject combinations
- `POST /api/type-combinations/undo` - Reset to pending
- `POST /api/type-combinations/clear` - Clear all combinations
```

#### 3.4.6 UML Diagram

**Purpose**: Visual representation of domain model

**Features**:
- Interactive drag-and-drop entity positioning
- Visual representation of entities and relationships
- Export functionality (image export)
- Position persistence in database
- Real-time updates

**Database Schema**:
```sql
uml_entity_positions (
  entity_id, project_id, x, y
)
```

**Key Endpoints**:
- `GET /api/uml-positions` - Get saved positions
- `POST /api/uml-positions` - Save/update position
- `POST /api/uml-positions/reset` - Reset all positions
```

**Frontend Implementation**:
- Konva.js for canvas rendering
- React-Konva for React integration
- Drag handlers for entity movement
- Relationship line drawing

---

### 3.5 Domain-Level Use Cases Module

**Purpose**: Comprehensive use case documentation with AI assistance

#### 3.5.1 Use Case Structure

**Use Case Attributes**:
- Name
- Version
- Stakeholder
- Confluence Link (optional)
- Completion Percent
- Published Status
- Description
- Project ID

**Associated Data**:
- Actors (linked personas)
- Inputs
- Output Flows (Expected, Alternate[UI], Alternate[BL], Exceptional)
- Output Definitions (for each flow)
- Output Info
- Preconditions
- Postconditions
- Triggers
- Links (to other use cases)
- Features (linked features)

**Database Schema**:
```sql
domain_level_usecases (
  id, project_id, name, version, stakeholder, 
  confluence_link, completion_percent, published, description
)

domain_level_usecase_actors (
  usecase_id, actor_id
)

domain_level_usecase_inputs (
  id, usecase_id, name, description, type, 
  default_value, sources, destinations
)

domain_level_usecase_output_flows (
  id, usecase_id, name, type, description
)

domain_level_usecase_output_definitions (
  id, flow_id, name, description, type, 
  default_value, sources, destinations
)

domain_level_usecase_output_info (
  id, flow_id, ...
)

domain_level_usecase_preconditions (
  id, usecase_id, name, type, description
)

domain_level_usecase_postconditions (
  id, usecase_id, name, type, description
)

domain_level_usecase_triggers (
  id, usecase_id, action, location, event, 
  artifacts, trigger_condition, description
)

domain_level_usecase_links (
  id, usecase_id, linked_usecase_id, link_type, description
)

domain_usecase_features (
  id, usecase_id, feature_id
)
```

**Key Endpoints**:
- `GET /api/projects/:projectId/domain-usecases` - List use cases
- `POST /api/projects/:projectId/domain-usecases` - Create use case
- `GET /api/domain-usecases/:id` - Get use case details
- `PUT /api/domain-usecases/:id` - Update use case
- `DELETE /api/domain-usecases/:id` - Delete use case
```

#### 3.5.2 AI Generation for Use Cases

**AI Model**: Google Gemini 1.5 Pro

**Generation Capabilities**:
1. **Actors Generation**: Recommends relevant personas based on use case context
2. **Inputs Generation**: Generates required inputs with types, sources, destinations
3. **Outputs Generation**: Creates output flows with definitions (one flow at a time)
4. **Preconditions Generation**: Generates 5-6 preconditions with types
5. **Postconditions Generation**: Generates 5-6 postconditions with types
6. **Triggers Generation**: Generates 4-6 triggers with action, location, event, artifacts, conditions

**AI Context**:
- Use case details (name, description, stakeholder)
- Project description
- User edit logs (tracks user modifications)
- User feedback (for regeneration)

**Features**:
- Context-aware generation using previous edits
- Upsert logic (updates existing similar items, creates new ones)
- Reasoning provided for each generated item
- Generation logging for audit trail

**Database Schema**:
```sql
ai_generation_logs (
  id, project_id, usecase_id, tab_name, 
  action, item_id, item_data (JSON), user_id, created_at
)
```

**Key Endpoints**:
- `POST /api/domain-usecases/:id/actors/generate` - Generate actors
- `POST /api/domain-usecases/:id/inputs/generate` - Generate inputs
- `POST /api/domain-usecases/:id/outputs/generate` - Generate outputs
- `POST /api/domain-usecases/:id/preconditions/generate` - Generate preconditions
- `POST /api/domain-usecases/:id/postconditions/generate` - Generate postconditions
- `POST /api/domain-usecases/:id/triggers/generate` - Generate triggers
```

---

## 4. AI Integration Details

### 4.1 OpenAI GPT-4o Integration

**Primary Use Cases**:
1. **Domain Model Generation**: Generates entities, types, and relationships from UCD and use case data
2. **Lean Canvas Sections**: Generates content for each Lean Canvas section
3. **Features Generation**: Generates 8-12 features organized by MoSCoW
4. **Type Combinations Validation**: Identifies special and impossible type combinations
5. **External Systems Generation**: Suggests external systems based on project description

**Configuration**:
- Model: `gpt-4o`
- Temperature: 0.1 (for consistent, deterministic outputs)
- API Key: Stored in environment variable `OPENAI_API_KEY`

**Prompt Engineering**:
- Structured prompts with clear JSON output requirements
- Context injection (project description, existing data, user feedback)
- Error handling for malformed JSON responses
- Batch processing for large datasets (type combinations)

### 4.2 Google Gemini Integration

**Primary Use Cases**:
1. **Personas Generation**: Creates user personas with pain points, motivations, solutions
2. **Use Case Components**: Generates actors, inputs, outputs, preconditions, postconditions, triggers

**Configuration**:
- Model: `gemini-1.5-pro`
- API Key: Stored in environment variable `GEMINI_API_KEY`

**Features**:
- Context-aware generation using use case history
- Sanitization of log data to prevent circular references
- Prompt truncation for large contexts (20,000 character limit)
- Fallback handling for parsing errors

### 4.3 AI Generation Workflow

1. **User Request**: User clicks "Generate" button for a specific component
2. **Context Gathering**: System fetches:
   - Project details
   - Existing data
   - User edit logs (for use cases)
   - User feedback (if provided)
3. **Prompt Construction**: System builds detailed prompt with context
4. **AI API Call**: Makes request to OpenAI/Gemini API
5. **Response Parsing**: Extracts JSON from AI response (handles markdown code blocks)
6. **Data Processing**: 
   - Merges with existing data (upsert logic)
   - Validates data structure
   - Stores in database
7. **Logging**: Records generation in `ai_generation_logs` table
8. **User Feedback**: Returns generated data with reasoning

---

## 5. Database Architecture

### 5.1 Database Overview

**Database**: MySQL 8.0
**Host**: AWS RDS (ap-south-1 region)
**Character Set**: utf8mb4
**Collation**: utf8mb4_0900_ai_ci

### 5.2 Key Tables

#### Core Tables
- `projects` - Project container
- `auth_users` - User authentication
- `project_sections` - Lean Canvas sections

#### UCD Tables
- `personas` - User personas
- `persona_sections` - Persona details (pain points, motivations, solutions)
- `features` - Feature definitions
- `feature_pages` - Feature-page associations
- `external_systems` - External system definitions
- `feature_feature_dependencies` - Feature dependencies
- `actor_feature_dependencies` - Actor-feature relationships
- `external_feature_dependencies` - External system-feature relationships

#### Domain Tables
- `entities` - Domain entities
- `entity_types` - Entity attributes/types/roles
- `relationships` - Entity relationships
- `dsm_relationships` - DSM matrix relationships
- `type_combinations` - Type combination analysis
- `uml_entity_positions` - UML diagram positions

#### Use Case Tables
- `domain_level_usecases` - Use case definitions
- `domain_level_usecase_actors` - Use case-actor links
- `domain_level_usecase_inputs` - Use case inputs
- `domain_level_usecase_output_flows` - Output flows
- `domain_level_usecase_output_definitions` - Output definitions
- `domain_level_usecase_output_info` - Output information
- `domain_level_usecase_preconditions` - Preconditions
- `domain_level_usecase_postconditions` - Postconditions
- `domain_level_usecase_triggers` - Triggers
- `domain_level_usecase_links` - Use case links
- `domain_usecase_features` - Use case-feature links

#### Supporting Tables
- `ai_generation_logs` - AI generation audit trail
- `feedback` - User feedback storage
- `project_user_state` - User state persistence

### 5.3 Database Design Principles

1. **Foreign Key Constraints**: Cascade deletes for data integrity
2. **Indexes**: Strategic indexes on foreign keys and frequently queried columns
3. **JSON Storage**: Used for flexible data structures (persona sections, type combinations)
4. **Project Isolation**: All tables include `project_id` for multi-tenancy
5. **Audit Fields**: `created_at` timestamps on most tables
6. **Unique Constraints**: Prevent duplicate relationships and combinations

---

## 6. Frontend Architecture

### 6.1 Component Structure

**Main Components**:
- `App.jsx` - Root component with routing and authentication
- `ProjectList.jsx` - Project listing page
- `ProjectWorkspace.jsx` - Main workspace container with tab navigation
- `DomainLevelUseCaseDetail.jsx` - Detailed use case view

**Domain Components**:
- `DEContent.jsx` - Domain Entities view
- `DETContent.jsx` - Entity Types view
- `DSMContent.jsx` - DSM Matrix view
- `TypeCombinations.jsx` - Type Combinations management
- `UMLDiagram.jsx` - UML diagram visualization

**UCD Components**:
- `LeanCanvasSections.jsx` - Lean Canvas sections
- `ActorsTab.jsx` - Personas management
- `FunctionalityListSections.jsx` - Features list
- `FunctionalityFunctionalityMatrix.jsx` - Feature-feature matrix
- `ActorFunctionalityMatrix.jsx` - Actor-feature matrix
- `ExternalSystemFunctionalityMatrix.jsx` - External-feature matrix
- `ExternalSystemsTab.jsx` - External systems management
- `UseCasesTab.jsx` - Use cases list
- `DomainLevelUseCases.jsx` - Domain use cases management

**Use Case Detail Components**:
- `usecase/GeneralTab.jsx` - General use case info
- `usecase/ActorsTab.jsx` - Use case actors
- `usecase/InputsTab.jsx` - Use case inputs
- `usecase/OutputsTab.jsx` - Use case outputs
- `usecase/PreconditionsTab.jsx` - Preconditions
- `usecase/PostconditionsTab.jsx` - Postconditions
- `usecase/TriggersTab.jsx` - Triggers
- `usecase/LinksTab.jsx` - Use case links

**Shared Components**:
- `components/Login.jsx` - Login form
- `components/Settings.jsx` - User settings
- `components/PasswordChangeDialog.jsx` - Password change modal
- `components/UCDNavigationButtons.jsx` - Navigation helpers

### 6.2 Routing Structure

```
/ → ProjectList (requires auth)
/login → Login page
/settings → Settings page (requires auth)
/project/:projectId/:mainTab?/:subTab? → ProjectWorkspace
/project/:projectId/domain-usecases/:usecaseId → Use case detail view
```

**Main Tabs**:
- `ucd` - User-Centered Design module
- `domain-usecases` - Domain use cases list
- `domain` - Domain modeling module
- `settings` - User settings

**UCD Subtabs**:
- `understanding` - Lean Canvas
- `actors` - Personas
- `functionality` - Features list
- `external-list` - External systems
- `ff-matrix` - Feature-feature matrix
- `af-matrix` - Actor-feature matrix
- `esf-matrix` - External system-feature matrix

**Domain Subtabs**:
- `entities` - Domain entities
- `types` - Entity types
- `dsm` - DSM matrix
- `combinations` - Type combinations
- `uml` - UML diagram

### 6.3 State Management

**Approach**: React hooks (useState, useEffect, useContext)

**State Patterns**:
- Local component state for UI state
- API calls for data fetching
- localStorage for authentication persistence
- URL parameters for navigation state

**Data Flow**:
1. Component mounts → Fetch data from API
2. User interaction → Update local state → API call → Update UI
3. Navigation → URL change → Component remount → Fetch new data

### 6.4 UI/UX Features

- **Material-UI Components**: Consistent design system
- **Responsive Design**: Mobile-friendly layouts
- **Toast Notifications**: User feedback via Notistack
- **Loading States**: Spinners and skeleton screens
- **Error Handling**: User-friendly error messages
- **Auto-save**: Automatic persistence of changes
- **Drag-and-Drop**: Reordering in lists and UML diagram
- **Modal Dialogs**: For confirmations and forms
- **Tab Navigation**: Organized content structure

---

## 7. API Design

### 7.1 API Conventions

**Base URL**: `/api`

**HTTP Methods**:
- `GET` - Retrieve resources
- `POST` - Create resources or trigger actions
- `PUT` - Update resources
- `DELETE` - Delete resources

**Response Format**:
- Success: JSON object with data
- Error: JSON object with `error` field and optional `details`

**Authentication**:
- JWT token in `Authorization: Bearer <token>` header
- Protected routes use `authenticateToken` middleware
- Admin routes use `requireAdmin` middleware

### 7.2 Error Handling

**Error Responses**:
```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```

**HTTP Status Codes**:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

**Error Logging**:
- Server-side logging via `console.error`
- Morgan middleware for HTTP request logging
- Database error tracking

### 7.3 API Endpoints Summary

**Authentication** (5 endpoints):
- Login, logout, change password, get user, user management

**Projects** (5 endpoints):
- CRUD operations + AI generation

**UCD** (30+ endpoints):
- Lean Canvas sections, personas, features, external systems, matrices

**Domain** (20+ endpoints):
- Entities, types, relationships, DSM, type combinations, UML

**Use Cases** (40+ endpoints):
- Use case CRUD, actors, inputs, outputs, preconditions, postconditions, triggers, links, AI generation

---

## 8. Security Implementation

### 8.1 Authentication Security

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Tokens**: Signed tokens with expiration (7 days)
- **Token Storage**: localStorage (frontend)
- **Token Validation**: Middleware on protected routes
- **Password Policy**: Enforced password change on first login

### 8.2 Authorization

- **Role-Based Access Control**: Admin and User roles
- **Route Protection**: Middleware checks authentication
- **Admin-Only Endpoints**: User management endpoints
- **Self-Protection**: Admins cannot delete themselves

### 8.3 Data Security

- **SQL Injection Prevention**: Parameterized queries (mysql2)
- **XSS Prevention**: React's built-in XSS protection
- **CORS Configuration**: Configured for frontend origin
- **Environment Variables**: Sensitive data in `.env` file
- **API Key Protection**: Keys stored server-side only

### 8.4 Input Validation

- **Backend Validation**: Required field checks
- **Type Validation**: Data type verification
- **Enum Validation**: Restricted values for enums
- **Sanitization**: Data sanitization before AI calls

---

## 9. Performance Optimizations

### 9.1 Database Optimizations

- **Connection Pooling**: MySQL connection pool (10 connections)
- **Indexes**: Strategic indexes on foreign keys
- **Query Optimization**: Efficient JOIN queries
- **Batch Operations**: Batch inserts for type combinations
- **Transaction Management**: Atomic operations for data integrity

### 9.2 Frontend Optimizations

- **Code Splitting**: Vite automatic code splitting
- **Lazy Loading**: Component lazy loading where applicable
- **Memoization**: React.memo for expensive components
- **Debouncing**: Input debouncing for search/filter
- **Pagination**: Paginated data loading

### 9.3 API Optimizations

- **Batch Processing**: AI calls in batches (100 items)
- **Caching**: Browser caching for static assets
- **Compression**: Express JSON compression
- **Request Batching**: Multiple operations in single request where possible

---

## 10. Deployment & Infrastructure

### 10.1 Current Deployment

**Backend**:
- Node.js Express server
- Port: 4000
- Static file serving for built frontend
- SPA fallback routing

**Frontend**:
- Vite build process
- Static assets served from backend `/public`
- Production build optimized

**Database**:
- AWS RDS MySQL 8.0
- Region: ap-south-1
- Connection via connection pool

### 10.2 Environment Configuration

**Backend `.env`**:
```
DB_HOST=database-1.clkw8s8ws972.ap-south-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=<password>
DB_NAME=DomainFlow
PORT=4000
OPENAI_API_KEY=<key>
GEMINI_API_KEY=<key>
JWT_SECRET=<secret>
```

### 10.3 Build Process

**Frontend Build**:
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

**Backend Start**:
```bash
cd backend
npm start
# Runs: node index.js
```

---

## 11. Key Algorithms & Logic

### 11.1 Type Combination Generation

**Algorithm**: Cartesian Product
```javascript
function cartesian(arr) {
  return arr.reduce((a, b) => 
    a.flatMap(d => b.map(e => [...d, e])), 
    [[]]
  );
}
```

**Process**:
1. Get all entities with types
2. Create array of type arrays (one per entity)
3. Generate cartesian product
4. Hash each combination (SHA256)
5. Batch process through AI (100 per batch)
6. Store results with AI suggestions

### 11.2 Data Merging Logic

**Merge Strategy**: Uploaded data takes priority over AI-generated data
```javascript
function mergeByName(uploadedArr, aiArr, key = 'name') {
  const map = new Map();
  // Add AI data first
  for (const item of aiArr) {
    if (item && item[key]) 
      map.set(item[key].toLowerCase(), item);
  }
  // Override with uploaded data
  for (const item of uploadedArr) {
    if (item && item[key]) 
      map.set(item[key].toLowerCase(), { 
        ...map.get(item[key].toLowerCase()), 
        ...item 
      });
  }
  return Array.from(map.values());
}
```

### 11.3 Upsert Logic for AI Generation

**Pattern**: Update if similar exists, create if new
- Compare by name/type (case-insensitive)
- Update existing records
- Create new records for unmatched items
- Maintain referential integrity

---

## 12. Testing & Quality Assurance

### 12.1 Current Testing

- **Manual Testing**: User acceptance testing
- **Error Handling**: Comprehensive error handling throughout
- **Input Validation**: Backend and frontend validation
- **Logging**: Extensive logging for debugging

### 12.2 Error Scenarios Handled

- Database connection failures
- AI API failures (with fallbacks)
- Invalid JSON parsing
- Missing data scenarios
- Authentication failures
- Authorization failures
- Network errors

---

## 13. Future Enhancements & Scalability

### 13.1 Potential Improvements

1. **Testing**: Unit tests, integration tests, E2E tests
2. **Caching**: Redis for frequently accessed data
3. **Real-time Updates**: WebSocket support for collaborative editing
4. **Export Features**: PDF/DOCX export for documentation
5. **Version Control**: Version history for entities and use cases
6. **Search**: Full-text search across projects
7. **Templates**: Project templates for common domains
8. **Collaboration**: Multi-user editing with conflict resolution
9. **Analytics**: Usage analytics and reporting
10. **API Documentation**: OpenAPI/Swagger documentation

### 13.2 Scalability Considerations

- **Database**: Read replicas for scaling reads
- **Caching Layer**: Redis for session and data caching
- **Load Balancing**: Multiple backend instances
- **CDN**: Static asset delivery via CDN
- **Database Sharding**: Project-based sharding if needed
- **AI Rate Limiting**: Queue system for AI requests

---

## 14. Development Workflow

### 14.1 Setup Instructions

**Prerequisites**:
- Node.js v18+
- MySQL 8.0+
- npm

**Backend Setup**:
```bash
cd backend
npm install
# Create .env file with database and API keys
npm start
```

**Frontend Setup**:
```bash
cd frontend
npm install
npm run dev  # Development server
npm run build  # Production build
```

### 14.2 Code Organization

- **Modular Routes**: Separate route files by feature
- **Helper Functions**: Reusable utility functions
- **Constants**: Centralized configuration
- **Error Handling**: Consistent error handling patterns

---

## 15. Key Metrics & Statistics

### 15.1 Codebase Statistics

- **Backend Routes**: 4 main route files
- **Frontend Components**: 30+ React components
- **Database Tables**: 30+ tables
- **API Endpoints**: 100+ endpoints
- **AI Integration Points**: 10+ generation endpoints

### 15.2 Feature Completeness

- ✅ Authentication & Authorization
- ✅ Project Management
- ✅ UCD Module (Lean Canvas, Personas, Features)
- ✅ Domain Modeling (Entities, Types, Relationships, DSM)
- ✅ Type Combinations with AI Validation
- ✅ UML Diagram Visualization
- ✅ Domain-Level Use Cases
- ✅ AI Generation for All Major Components
- ✅ Dependency Matrices
- ✅ User Management

---

## 16. Interview Talking Points

### 16.1 Architecture Highlights

1. **Full-Stack Expertise**: Demonstrated ability to build complete applications from database to UI
2. **AI Integration**: Successfully integrated multiple AI models (OpenAI, Gemini) for content generation
3. **Complex Data Modeling**: Designed and implemented complex relational database schema
4. **RESTful API Design**: Well-structured API with proper HTTP methods and status codes
5. **Security Implementation**: JWT authentication, password hashing, role-based access control
6. **Modern Frontend**: React with hooks, Material-UI, responsive design
7. **Database Design**: Normalized schema with proper relationships and constraints

### 16.2 Technical Challenges Solved

1. **AI Prompt Engineering**: Developed effective prompts for consistent AI outputs
2. **Data Merging**: Implemented intelligent merge logic for AI-generated vs user-uploaded data
3. **Type Combinations**: Efficient cartesian product generation and batch AI processing
4. **Complex Relationships**: Managed many-to-many relationships across multiple entities
5. **State Management**: Coordinated complex state across multiple components
6. **Error Handling**: Comprehensive error handling for AI failures and edge cases

### 16.3 Business Value

1. **Automation**: AI reduces manual documentation time significantly
2. **Consistency**: AI ensures consistent documentation structure
3. **Scalability**: Multi-project support with data isolation
4. **Collaboration**: User management enables team collaboration
5. **Visualization**: UML diagrams and matrices provide visual insights
6. **Quality**: Type combination validation ensures business logic correctness

---

## Conclusion

DomainFlow is a sophisticated, production-ready application that demonstrates expertise in full-stack development, AI integration, database design, and modern web technologies. The system successfully combines traditional software engineering practices with cutting-edge AI capabilities to create a powerful tool for domain modeling and requirements documentation.

The architecture is scalable, maintainable, and follows industry best practices for security, performance, and code organization. The integration of multiple AI models showcases advanced API integration skills, while the complex data model demonstrates strong database design capabilities.

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Author**: DomainFlow Development Team

