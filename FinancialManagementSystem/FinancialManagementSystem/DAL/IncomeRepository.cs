using FinancialManagementSystem.DAL.RepositoryServices;
using FinancialManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace FinancialManagementSystem.DAL
{
    public class IncomeRepository : IIncomeRepository
    {
        private readonly ApplicationDbContext _context;

        public IncomeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Income>> GetIncomesByUserAsync(int userId)
        {
            return await _context.Income.Where(i => i.UserId == userId).ToListAsync();
        }

        public async Task<Income> GetIncomeByIdAsync(int id, int userId)
        {
            return await _context.Income.FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);
        }

        public async Task AddIncomeAsync(Income income)
        {
            _context.Income.Add(income);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateIncomeAsync(Income income)
        {
            var local = _context.Income.Local.FirstOrDefault(i => i.Id == income.Id);
            if (local != null)
            {
                _context.Entry(local).State = EntityState.Detached;
            }
            _context.Income.Update(income);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteIncomeAsync(int id, int userId)
        {
            var income = await GetIncomeByIdAsync(id, userId);
            if (income != null)
            {
                _context.Income.Remove(income);
                await _context.SaveChangesAsync();
            }
        }
    }
}
