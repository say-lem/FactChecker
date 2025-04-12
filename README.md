# FactChecker Web App

A web-based tool to verify the truthfulness of user-submitted claims using NLP, semantic search, and fact-checked sources.


## Features

- Submit claims for verification
- Search for similar claims from verified databases
- NLP-based matching & verdict scoring
- User authentication 



## Tech Stack

**Backend Language & Framework**: Node.js with Express.js
**Programming Language**: TypeScript (strict mode)
**Database**: MongoDB (with Mongoose) 
**Authentication**: JWT (JSON Web Tokens) with bcrypt for password hashing
**Fact-Checking API**: Google Fact Check API
**Testing Framework**: Jest or Vitest



## Getting Started

### 1. Clone the repo

git clone https://github.com/say-lem/FactChecker.git

# Install dependencies
npm install

# Set up environment variables
cp .env.sample .env
# Edit the .env file with your MongoDB URI and other configs

# Start the server
npm run dev


## API Endpoints are on page 6 & 7, 0f the document below
https://docs.google.com/document/d/1RLyghKJQiMq6YDl1Vj6sg8Fs4GBw_Zukz82pzL12tIc/edit?tab=t.0


## Project Structure

truthchecker-backend/
├── src/
│   ├── controllers/        // Business logic per route
│   ├── routes/             // API endpoints
│   ├── models/             // Mongoose schemas
│   ├── middlewares/        // Authentication, error handling, rate limiting, ownership
│   ├── services/           // Google Fact Check API interaction, rating logic, caching
│   ├── utils/              // General helper functions
│   ├── types/              // Shared TypeScript types and interfaces
│   ├── config/             // Database connection, API keys, environment variables
│   └── app.ts              // Main entry point of the application
├── tests/                // Unit and integration tests
├── docs/                 // API documentation (e.g., Swagger/OpenAPI)
├── package.json
├── tsconfig.json
├── .env                    // Environment variables
└── README.md

## Contributing
Fork the project

Create a new branch: git checkout -b "branch-name"

Commit your changes

Push to your branch

Create a Pull Request

