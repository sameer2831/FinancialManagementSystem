using FinancialManagementSystem.BLL.Services;
using FinancialManagementSystem.DTOs;
using System;
using FinancialManagementSystem.DAL;
using Microsoft.EntityFrameworkCore;

namespace FinancialManagementSystem.BLL
{
    public class TransactionService : ITransactionService
    {
        private readonly ApplicationDbContext _context;

        public TransactionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TransactionDto>> GetUserTransactionsAsync(int userId)
        {
            var incomes = await _context.Income
                .Where(i => i.UserId == userId)
                .Select(i => new TransactionDto
                {
                    Date = i.Date,
                    Type = "Income",
                    Category = i.Category.ToString(),
                    Description = i.Description,
                    Amount = i.Amount
                })
                .ToListAsync();

            var expenses = await _context.Expense
                .Where(e => e.UserId == userId)
                .Select(e => new TransactionDto
                {
                    Date = e.Date,
                    Type = "Expense",
                    Category = e.Category.ToString(),
                    Description = e.Description,
                    Amount = e.Amount
                })
                .ToListAsync();

            return incomes.Concat(expenses)
                          .OrderByDescending(t => t.Date)
                          .ToList();
        }
    }

}
