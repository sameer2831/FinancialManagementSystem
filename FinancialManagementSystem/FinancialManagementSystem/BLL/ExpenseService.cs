using FinancialManagementSystem.BLL.Services;
using FinancialManagementSystem.DAL.RepositoryServices;
using FinancialManagementSystem.Models;

namespace FinancialManagementSystem.BLL
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _expenseRepository;

        public ExpenseService(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        public Task<IEnumerable<Expense>> GetExpensesByUserAsync(int userId) =>
            _expenseRepository.GetExpensesByUserAsync(userId);

        public Task<Expense> GetExpenseByIdAsync(int id, int userId) =>
            _expenseRepository.GetExpenseByIdAsync(id, userId);

        public Task AddExpenseAsync(Expense expense) =>
            _expenseRepository.AddExpenseAsync(expense);

        public Task UpdateExpenseAsync(Expense expense) =>
            _expenseRepository.UpdateExpenseAsync(expense);

        public Task DeleteExpenseAsync(int id, int userId) =>
            _expenseRepository.DeleteExpenseAsync(id, userId);
    }
}
