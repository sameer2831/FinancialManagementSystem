-- Create the FinancialDB database
CREATE DATABASE FinancialDB;
GO

-- Use the database
USE FinancialDB;
GO

-- Table: Users
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) NOT NULL DEFAULT 'User',
    CreatedAt DATETIME DEFAULT GETDATE()
);
Alter table Users add  Username NVARCHAR(255) NOT NULL;
Alter table Users add  ResetToken NVARCHAR(255) ;
Alter table Users add  ResetTokenExpiry DATETIME ;

-- Table: Accounts
CREATE TABLE Accounts (
    AccountId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    AccountType NVARCHAR(50) NOT NULL, -- e.g., Savings, Investment, Expense
    Balance DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- Table: Transactions
CREATE TABLE Transactions (
    TransactionId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    TransactionType NVARCHAR(50) NOT NULL, -- e.g., Credit, Debit
    Category NVARCHAR(100),
    Description NVARCHAR(255),
    TransactionDate DATETIME NOT NULL,
    FOREIGN KEY (AccountId) REFERENCES Accounts(AccountId)
);

-- Table: Stocks
CREATE TABLE Stocks (
    StockId INT IDENTITY(1,1) PRIMARY KEY,
    Symbol NVARCHAR(10) NOT NULL,
    CompanyName NVARCHAR(100) NOT NULL,
    CurrentPrice DECIMAL(18,2) NOT NULL
);

-- Table: StockHoldings
CREATE TABLE StockHoldings (
    HoldingId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    StockId INT NOT NULL,
    Quantity INT NOT NULL,
    AveragePrice DECIMAL(18,2) NOT NULL,
    PurchaseDate DATETIME NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (StockId) REFERENCES Stocks(StockId)
);

CREATE TABLE Income (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Amount DECIMAL(10,2) NOT NULL,
    Category VARCHAR(50) NOT NULL,  -- e.g., Salary, Business, Investment
    Description NVARCHAR(250),
    Date DATETIME NOT NULL DEFAULT GETUTCDATE(),
    UserId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);


CREATE TABLE Expense (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Amount DECIMAL(10,2) NOT NULL,
    Category VARCHAR(50) NOT NULL,  -- e.g., Rent, Groceries, Utilities
    Description NVARCHAR(250),
    Date DATETIME NOT NULL DEFAULT GETUTCDATE(),
    UserId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- Income Category Constraint Example
ALTER TABLE Income
ADD CONSTRAINT CK_Income_Category CHECK (
    Category IN ('Salary', 'Business', 'Investment', 'Freelancing', 'RentalIncome', 'Refunds','Interests', 'Gifts', 'Others')
);

-- Expense Category Constraint Example
ALTER TABLE Expense
ADD CONSTRAINT CK_Expense_Category CHECK (
    Category IN ('Rent', 'Groceries', 'Utilities', 'Transportation', 'Entertainment', 'Dining',
                 'Healthcare', 'Insurance', 'Education', 'Travel', 'Shopping', 'Subscriptions', 'Other')
);

CREATE TABLE Budgets (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Amount DECIMAL(18, 2) NOT NULL,
    Category NVARCHAR(100) NOT NULL,
    PeriodType NVARCHAR(20) NOT NULL, -- Expected values: 'Monthly', 'Yearly'
    Period DATE NOT NULL,
    CONSTRAINT FK_Budgets_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);