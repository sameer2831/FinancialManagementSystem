using FinancialManagementSystem.DAL.RepositoryServices;
using FinancialManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace FinancialManagementSystem.DAL
{
    public class BudgetRepository : IBudgetRepository
    {
        private readonly ApplicationDbContext _context;

        public BudgetRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Budget>> GetBudgetsByUserAsync(int userId)
        {
            return await _context.Budgets
                .Where(b => b.UserId == userId)
                .ToListAsync();
        }

        public async Task<Budget> GetBudgetByIdAsync(int id)
        {
            return await _context.Budgets.FindAsync(id);
        }

        public async Task AddBudgetAsync(Budget budget)
        {
            await _context.Budgets.AddAsync(budget);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBudgetAsync(Budget budget)
        {
            // Detach any existing tracked instance with the same Id
            var tracked = _context.ChangeTracker.Entries<Budget>()
                .FirstOrDefault(e => e.Entity.Id == budget.Id);

            if (tracked != null)
                tracked.State = EntityState.Detached;

            // Attach and mark the incoming entity as modified
            _context.Entry(budget).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBudgetAsync(int id)
        {
            var budget = await _context.Budgets.FindAsync(id);
            if (budget != null)
            {
                _context.Budgets.Remove(budget);
                await _context.SaveChangesAsync();
            }
        }
    }
}
