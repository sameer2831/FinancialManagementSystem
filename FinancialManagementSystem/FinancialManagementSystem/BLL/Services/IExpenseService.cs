using FinancialManagementSystem.Models;

namespace FinancialManagementSystem.BLL.Services
{
    public interface IExpenseService
    {
        Task<IEnumerable<Expense>> GetExpensesByUserAsync(int userId);
        Task<Expense> GetExpenseByIdAsync(int id, int userId);
        Task AddExpenseAsync(Expense expense);
        Task UpdateExpenseAsync(Expense expense);
        Task DeleteExpenseAsync(int id, int userId);
    }
}
