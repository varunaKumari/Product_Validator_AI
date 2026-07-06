# Product Validator AI 🚀

An AI-powered Full Stack SaaS application designed to help entrepreneurs, developers, and product managers validate their startup ideas using advanced LLM reasoning, real-world live market crawling, SWOT evaluations, and persona building, producing high-impact, investor-ready vector PDF reports.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![Next.js Version](https://img.shields.io/badge/Next.js-v15.0-blue.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-green.svg)](https://www.mongodb.com/atlas)

---

## 🏗️ Architecture Blueprint

The application is built using a decoupled architecture, dividing frontend layout assets from backend logic services to scale nodes independently.

```
       ┌────────────────────────┐
       │   Next.js 15 Client    │ (Vercel Edge, Server Components, SSR)
       └───────────┬────────────┘
                   │ HTTPS API Requests
                   ▼
       ┌────────────────────────┐
       │  Express.js TS API     │ (Railway / Docker Container Node)
       └─────┬────────────┬─────┘
             │            │
             ▼            ▼
      ┌────────────┐┌────────────┐
      │  MongoDB   ││   Redis    │ (Upstash / Local caching)
      │   Atlas    │└────────────┘
      └────────────┘
```

- **Frontend client**: Built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, and Zod.
- **Backend API**: Configured with Express.js, TypeScript, and Mongoose. Adheres to a strict **Controller-Service-Repository** pattern.
- **Database**: MongoDB Atlas for schema-based persistency; Redis for API query caching.

---

## 📁 Project Folder Structure

```
product-validator/
├── client/                     # Next.js App Router Frontend
│   ├── public/                 # Static asset definitions
│   ├── src/
│   │   ├── app/                # App Router Layouts, Pages, fallback UI
│   │   ├── components/         # Reusable dashboard widgets
│   │   ├── hooks/              # Custom hook wrappers (useAuth, useValidation)
│   │   ├── lib/                # Axios instance, react-query clients
│   │   └── validators/         # Zod schemas for client forms
│   └── tailwind.config.ts      # CSS layout themes
│
├── backend/                    # Express.js REST API
│   ├── src/
│   │   ├── config/             # Connection managers (db.ts)
│   │   ├── controllers/        # Request payload parsers and handlers
│   │   ├── routes/             # Path routing configurations
│   │   ├── middleware/         # Auth verify, Zod schema validation, Error catchers
│   │   ├── models/             # Mongoose schemas (user.model.ts, validation.model.ts)
│   │   ├── services/           # Decoupled business logic (AI, Tavily search, PDF compilation)
│   │   └── utils/              # Pino logging helpers, custom AppError classes
│   └── tsconfig.json           # Backend compilation parameters
│
├── docs/                       # Specifications and designs
└── docker-compose.yml          # Container configuration
```

---

## ⚡ Setup & Launch Instructions

### Prerequisites
- **Node.js**: v20 or higher installed.
- **MongoDB**: A running local MongoDB server or a MongoDB Atlas connection URI.
- **Redis**: A running local Redis instance (optional for dev, required for jobs).

---

### Environment Setup

#### 1. Backend Config
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/product_validator_db
JWT_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_super_secret_jwt_refresh_key

# Third-party integrations
OPENAI_API_KEY=your_openai_api_key
TAVILY_API_KEY=your_tavily_api_key
NEWS_API_KEY=your_news_api_key
```

#### 2. Frontend Config
Create a `.env.local` file in the `client/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

### Run Commands

#### Starting Backend API
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Start the development server (runs with nodemon and ts-node):
   ```bash
   npm run dev
   ```
   The backend will start at `http://localhost:5000`.

#### Starting Frontend Client
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Start the local Next.js dev server:
   ```bash
   npm run dev
   ```
   The client will load at `http://localhost:3000`.

#### Running Infrastructure with Docker (Optional)
To quickly run local MongoDB and Redis databases using Docker:
```bash
docker-compose up -d
```

---

## 📈 Git Branching & Workflow

To maintain a production-grade workflow, follow standard **GitFlow** conventions:
- **`main`**: Mirror of production environment.
- **`develop`**: Primary integration sandbox branch.
- **`feature/*`**: Short-lived branches dedicated to specific tasks (e.g. `feature/health-check`).

### Pull Request & Commit Rules
Always use **Conventional Commits**:
- `feat(api): add JWT rotation hooks`
- `fix(client): repair user register validation`
- `docs(readme): update environment setup guide`

---

## 🚀 15-Day Roadmap Summary
- **Days 1-3**: Core framework foundation, MongoDB integrations, JWT token configurations.
- **Days 4-8**: Business models, OpenAI API prompt mappings, live crawling algorithms, PDF Kit compilations.
- **Days 9-12**: Next.js state client setup, hook forms, dashboard layouts, chart elements.
- **Days 13-15**: Jest & Playwright testing suites, Docker packaging, Vercel/Railway production deploy hooks.
