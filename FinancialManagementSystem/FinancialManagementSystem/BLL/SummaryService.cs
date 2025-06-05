using FinancialManagementSystem.BLL.Services;
using System;
using FinancialManagementSystem.DTOs;
using Microsoft.EntityFrameworkCore;
using FinancialManagementSystem.DAL;
namespace FinancialManagementSystem.BLL
{
    public class SummaryService : ISummaryService
    {
        private readonly ApplicationDbContext _context;

        public SummaryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MonthlySummaryDto> GetMonthlySummaryAsync(int userId)
        {
            var now = DateTime.Now;
            var start = new DateTime(now.Year, now.Month, 1);
            var end = start.AddMonths(1);

            var income = await _context.Income
                .Where(i => i.UserId == userId && i.Date >= start && i.Date < end)
                .SumAsync(i => (decimal?)i.Amount) ?? 0;

            var expense = await _context.Expense
                .Where(e => e.UserId == userId && e.Date >= start && e.Date < end)
                .SumAsync(e => (decimal?)e.Amount) ?? 0;

            return new MonthlySummaryDto
            {
                Month = now.ToString("MMMM"),
                TotalIncome = income,
                TotalExpense = expense,
                NetBalance = income - expense
            };
        }

        public async Task<CategorySummaryDto> GetCategoryBreakdownAsync(int userId)
        {
            var now = DateTime.Now;
            var start = new DateTime(now.Year, now.Month, 1);
            var end = start.AddMonths(1);

            var incomeByCategory = await _context.Income
                .Where(i => i.UserId == userId && i.Date >= start && i.Date < end)
                .GroupBy(i => i.Category)
                .Select(g => new { Category = g.Key.ToString(), Total = g.Sum(x => x.Amount) })
                .ToDictionaryAsync(x => x.Category, x => x.Total);

            var expenseByCategory = await _context.Expense
                .Where(e => e.UserId == userId && e.Date >= start && e.Date < end)
                .GroupBy(e => e.Category)
                .Select(g => new { Category = g.Key.ToString(), Total = g.Sum(x => x.Amount) })
                .ToDictionaryAsync(x => x.Category, x => x.Total);

            return new CategorySummaryDto
            {
                IncomeByCategory = incomeByCategory,
                ExpenseByCategory = expenseByCategory
            };
        }

        public async Task<List<MonthlyTrendDto>> GetMonthlyTrendsAsync(int userId)
        {
            var trends = new List<MonthlyTrendDto>();
            var now = DateTime.Now;

            for (int i = 5; i >= 0; i--)
            {
                var date = now.AddMonths(-i);
                var start = new DateTime(date.Year, date.Month, 1);
                var end = start.AddMonths(1);

                var income = await _context.Income
                    .Where(i => i.UserId == userId && i.Date >= start && i.Date < end)
                    .SumAsync(i => (decimal?)i.Amount) ?? 0;

                var expense = await _context.Expense
                    .Where(e => e.UserId == userId && e.Date >= start && e.Date < end)
                    .SumAsync(e => (decimal?)e.Amount) ?? 0;

                trends.Add(new MonthlyTrendDto
                {
                    Month = start.ToString("MMMM"),
                    Income = income,
                    Expense = expense
                });
            }

            return trends;
        }
    }
}
