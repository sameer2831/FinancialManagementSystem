# WealthMitra — Personal Finance Management

WealthMitra is a full-stack personal finance management web application built to help users track income and expenses, manage category-based budgets, review transactions, and understand their financial habits through visual reports.

The application uses a React frontend, an ASP.NET Core Web API backend, and SQL Server for persistent storage. JWT-based authentication protects user-specific financial data.

> **Project status:** Core authentication, income/expense management, transaction aggregation, and budget APIs/UI are part of the implementation. Reporting and chart integrations may depend on the current state of your local codebase.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Configure the backend](#2-configure-the-backend)
  - [3. Apply database migrations](#3-apply-database-migrations)
  - [4. Run the backend](#4-run-the-backend)
  - [5. Configure and run the frontend](#5-configure-and-run-the-frontend)
- [API Overview](#api-overview)
- [Authentication](#authentication)
- [Budgeting and Reporting Notes](#budgeting-and-reporting-notes)
- [Security Considerations](#security-considerations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Features

### Authentication and account management
- User registration and login.
- JWT-based authentication for protected endpoints.
- Forgot-password and reset-password flows.
- Logout endpoint designed to blacklist the active token.
- User-specific access to financial records.

### Income management
- Create and view income records.
- Categorize income sources, such as salary, freelance work, investments, rental income, gifts, refunds, interest, and other sources.
- Search and filter records by description, category, and date range in the UI.
- View income totals and category/monthly visualizations where chart components are enabled.
- Reuse the income-entry modal from different parts of the application.

### Expense management
- Create and view expense records.
- Categorize spending, including rent, groceries, utilities, transportation, entertainment, dining, healthcare, insurance, education, travel, shopping, subscriptions, and other expenses.
- Search and filter records by description, category, and date range in the UI.
- View expense totals and visual breakdowns where chart components are enabled.

### Transactions
- Combine records from the separate `Income` and `Expense` tables into a unified transaction history.
- Display transaction type, date, category, description, and amount.
- Sort transactions by date, newest first.

### Budget planning
- Create budgets for a specific category.
- Support monthly and yearly budget periods.
- View, update, and delete budget entries.
- Associate budgets with the authenticated user.
- Compare budgets with actual expenses as reporting integrations are completed.

### Dashboard and reporting
- Display a financial overview with income, expenses, and balance.
- Visualize income and expense trends and category distributions using Chart.js.
- Planned/ongoing reporting includes month-wise budget-versus-actual spending and category-level overspending indicators.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, React Router, Tailwind CSS |
| API communication | Axios |
| Data visualization | Chart.js, `react-chartjs-2` |
| Notifications | `react-toastify` |
| Backend | ASP.NET Core Web API, C# |
| Architecture | Controller, Business Logic Layer (BLL), Data Access Layer (DAL), repository/service abstractions |
| Database | Microsoft SQL Server |
| ORM | Entity Framework Core |
| Authentication | JWT (JSON Web Tokens) |

## Architecture

The project follows a layered architecture to separate HTTP handling, business rules, and database access.

```text
React Frontend
    |
    | Axios / HTTP + JWT bearer token
    v
ASP.NET Core Web API Controllers
    |
    v
Business Logic Layer (BLL)
    |
    v
Data Access Layer (DAL) / Repositories
    |
    v
Entity Framework Core
    |
    v
SQL Server
```

- **Frontend:** Renders pages, forms, filters, tables, and charts.
- **Controllers:** Handle HTTP requests, validate input, read authenticated user claims, and return HTTP responses.
- **BLL services:** Encapsulate application rules and coordinate repository operations.
- **DAL repositories:** Perform database access through Entity Framework Core.
- **SQL Server:** Persist user accounts, income, expense, and budget records.

## Project Structure

The exact structure may differ depending on your current solution. A typical layout is:

```text
WealthMitra/
├── FinancialManagementSystem/       # ASP.NET Core Web API solution/project
│   ├── Controllers/
│   │   ├── UserController.cs
│   │   ├── IncomeController.cs
│   │   ├── ExpenseController.cs
│   │   ├── TransactionController.cs
│   │   ├── BudgetController.cs
│   │   ├── SummaryController.cs
│   │   └── ReportController.cs
│   ├── BLL/
│   │   └── Services/
│   ├── DAL/
│   │   └── RepositoryServices/
│   ├── Models/
│   ├── DTOs/
│   ├── Data/
│   └── Program.cs
│
└── financial-manager-frontend/      # React application
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        └── App.jsx
```

## Prerequisites

Install the following before running the application:

- [.NET SDK](https://dotnet.microsoft.com/download) compatible with the backend project.
- [Node.js and npm](https://nodejs.org/).
- [Microsoft SQL Server](https://www.microsoft.com/sql-server) and a database client such as SQL Server Management Studio.
- Visual Studio or Visual Studio Code.
- Git.

## Getting Started

### 1. Clone the repository

Replace the placeholder URL with your repository URL.

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_DIRECTORY>
```

### 2. Configure the backend

Open the backend project and configure the database connection string and JWT settings in **User Secrets** or an environment-specific configuration file.

Example configuration (use placeholder values only):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=WealthMitraDb;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "REPLACE_WITH_A_SECURE_RANDOM_SECRET_OF_SUFFICIENT_LENGTH",
    "Issuer": "WealthMitra",
    "Audience": "WealthMitra"
  }
}
```

Adapt the connection-string key to match the one read by your `DbContext` configuration. Do not commit real passwords, production connection strings, or JWT signing keys to source control.

### 3. Apply database migrations

If the project uses Entity Framework Core migrations, run these commands from the directory containing the backend project (or specify the correct project paths):

```bash
dotnet ef database update
```

If the EF Core CLI is not installed, install it using:

```bash
dotnet tool install --global dotnet-ef
```

If your database is managed through SQL scripts rather than migrations, create the required tables and constraints using your project's scripts instead.

### 4. Run the backend

From the backend project directory:

```bash
dotnet restore
dotnet build
dotnet run
```

Use the URL shown in the terminal or in the project's `launchSettings.json`. If Swagger is configured, open the Swagger URL provided by the application to inspect and test endpoints.

### 5. Configure and run the frontend

Open a second terminal and navigate to the React frontend directory:

```bash
cd financial-manager-frontend
npm install
```

Configure the Axios instance in `src/services/api.js` to use your backend base URL. For example:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://localhost:YOUR_BACKEND_PORT/api',
});

export default api;
```

Replace `YOUR_BACKEND_PORT` with the actual backend port. If the app uses a different environment-variable convention or the API instance is already configured, keep the existing configuration.

Start the frontend:

```bash
npm start
```

The React application should open at the development URL shown by the terminal, commonly `http://localhost:3000`.

> **CORS:** Ensure the backend allows requests from the frontend development origin. Configure CORS explicitly in ASP.NET Core rather than disabling browser security.

## API Overview

The routes below reflect the controller names and routes discussed during development. Confirm exact route names and HTTP methods in the current controller code.

| Module | Example endpoint | Purpose |
|---|---|---|
| User | `POST /api/user/register` | Register an account |
| User | `POST /api/user/login` | Authenticate and return a JWT |
| User | `POST /api/user/forgot-password` | Start password recovery |
| User | `POST /api/user/reset-password` | Reset a password with a valid token |
| User | `POST /api/user/logout` | Blacklist the current JWT, if configured |
| Income | `GET /api/income` | Get the authenticated user's income records |
| Income | `GET /api/income/{id}` | Get a specific income record |
| Income | `POST /api/income` | Create an income record |
| Income | `PUT /api/income/{id}` | Update an income record |
| Income | `DELETE /api/income/{id}` | Delete an income record |
| Expense | `/api/expense` | Income-like CRUD endpoints for expenses, subject to controller routes |
| Transaction | `GET /api/transaction` | Get combined income and expense records |
| Budget | `GET /api/budget` | List the authenticated user's budgets |
| Budget | `POST /api/budget` | Create a budget |
| Budget | `PUT /api/budget/{id}` | Update a budget |
| Budget | `DELETE /api/budget/{id}` | Delete a budget |
| Summary | `GET /api/summary/monthly` | Get monthly financial totals |
| Summary | `GET /api/summary/categories` | Get category-level summary |
| Summary | `GET /api/summary/trends` | Get monthly trends |
| Report | `GET /api/report/monthly-summary?year=2026` | Month-wise budget-versus-actual report, if implemented |

Protected endpoints require the JWT in the request header:

```http
Authorization: Bearer <YOUR_JWT_TOKEN>
```

### Example: Create a budget

```http
POST /api/budget
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json
```

```json
{
  "amount": 1500.00,
  "category": "Groceries",
  "periodType": "Monthly",
  "period": "2026-10-01T00:00:00"
}
```

The API should derive the user ID from the authenticated token rather than trusting a `userId` supplied by the client.

## Authentication

The frontend stores the returned JWT and sends it with requests to protected APIs. The backend uses JWT claims to identify the authenticated user and scope financial records.

For a production deployment, consider:
- Short-lived access tokens and a secure refresh-token design if needed.
- A shared, durable token-revocation store if logout relies on a JWT blacklist.
- Secure storage and transport for authentication credentials.
- Rate limiting and generic authentication error messages.
- Email delivery and secure, time-limited password-reset tokens.

## Budgeting and Reporting Notes

A budget is associated with a user, category, amount, period type, and period reference.

- **Monthly budget:** applies to the selected category for a particular month and year.
- **Yearly budget:** applies to the selected category for a particular year.
- **Actual spending:** should be calculated from expense records for the same user, category, and reporting period.
- **Overspending:** a category is overspent when actual spending exceeds its applicable budget.

For yearly budgets, decide explicitly how the chart should compare them with monthly spending. You can display a yearly total alongside yearly actuals, or allocate the annual budget across months for a monthly chart. Do not mix the full annual amount into every month, as that would inflate the comparison.

## Security Considerations

- Never commit secrets, credentials, production JWT keys, or private connection strings.
- Enforce ownership checks for reads, updates, and deletes so users cannot access another user's records.
- Validate amounts, categories, period types, and dates on the server.
- Use HTTPS outside local development.
- Avoid returning raw exception details to clients in production; log errors server-side.
- Ensure password hashes are produced using a suitable password-hashing algorithm.
- Use a durable token blacklist or revocation mechanism if immediate JWT invalidation on logout is required.


## Contributing

1. Create a feature branch.
2. Make a focused change.
3. Run the backend build and frontend checks.
4. Open a pull request with a summary and test notes.

## License

No license has been specified yet. Add a `LICENSE` file before distributing the project if you intend to make its reuse terms explicit.
