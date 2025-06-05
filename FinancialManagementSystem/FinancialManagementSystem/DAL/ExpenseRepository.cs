using FinancialManagementSystem.DAL.RepositoryServices;
using FinancialManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace FinancialManagementSystem.DAL
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ApplicationDbContext _context;

        public ExpenseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Expense>> GetExpensesByUserAsync(int userId)
        {
            return await _context.Expense.Where(e => e.UserId == userId).ToListAsync();
        }

        public async Task<Expense> GetExpenseByIdAsync(int id, int userId)
        {
            return await _context.Expense.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);
        }

        public async Task AddExpenseAsync(Expense expense)
        {
            _context.Expense.Add(expense);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateExpenseAsync(Expense expense)
        {
            _context.Expense.Update(expense);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteExpenseAsync(int id, int userId)
        {
            var expense = await GetExpenseByIdAsync(id, userId);
            if (expense != null)
            {
                _context.Expense.Remove(expense);
                await _context.SaveChangesAsync();
            }
        }
    }

}
