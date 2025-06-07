using FinancialManagementSystem.BLL.Services;
using FinancialManagementSystem.DAL.RepositoryServices;
using FinancialManagementSystem.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinancialManagementSystem.BLL
{
    public class BudgetService : IBudgetService
    {
        private readonly IBudgetRepository _budgetRepository;

        public BudgetService(IBudgetRepository budgetRepository)
        {
            _budgetRepository = budgetRepository;
        }

        public async Task<IEnumerable<Budget>> GetBudgetsByUserAsync(int userId)
        {
            return await _budgetRepository.GetBudgetsByUserAsync(userId);
        }

        public async Task<Budget> GetBudgetByIdAsync(int id)
        {
            return await _budgetRepository.GetBudgetByIdAsync(id);
        }

        public async Task AddBudgetAsync(Budget budget)
        {
            await _budgetRepository.AddBudgetAsync(budget);
        }

        public async Task UpdateBudgetAsync(Budget budget)
        {
            await _budgetRepository.UpdateBudgetAsync(budget);
        }

        public async Task DeleteBudgetAsync(int id)
        {
            await _budgetRepository.DeleteBudgetAsync(id);
        }
    }
}
