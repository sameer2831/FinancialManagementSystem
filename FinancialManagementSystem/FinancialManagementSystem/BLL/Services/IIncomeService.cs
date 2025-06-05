using FinancialManagementSystem.Models;

namespace FinancialManagementSystem.BLL.Services
{
    public interface IIncomeService
    {
        Task<IEnumerable<Income>> GetIncomesByUserAsync(int userId);
        Task<Income> GetIncomeByIdAsync(int id, int userId);
        Task AddIncomeAsync(Income income);
        Task UpdateIncomeAsync(Income income);
        Task DeleteIncomeAsync(int id, int userId);
    }
}
