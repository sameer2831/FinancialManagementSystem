using FinancialManagementSystem.Models;

namespace FinancialManagementSystem.BLL.Services
{
    public interface IBudgetService
    {
        Task<IEnumerable<Budget>> GetBudgetsByUserAsync(int userId);
        Task<Budget> GetBudgetByIdAsync(int id);
        Task AddBudgetAsync(Budget budget);
        Task UpdateBudgetAsync(Budget budget);
        Task DeleteBudgetAsync(int id);
    }
}
