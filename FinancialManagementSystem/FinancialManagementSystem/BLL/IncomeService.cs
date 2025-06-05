using FinancialManagementSystem.BLL.Services;
using FinancialManagementSystem.DAL.RepositoryServices;
using FinancialManagementSystem.Models;

namespace FinancialManagementSystem.BLL
{
    public class IncomeService : IIncomeService
    {
        private readonly IIncomeRepository _incomeRepository;

        public IncomeService(IIncomeRepository incomeRepository)
        {
            _incomeRepository = incomeRepository;
        }

        public Task<IEnumerable<Income>> GetIncomesByUserAsync(int userId) =>
            _incomeRepository.GetIncomesByUserAsync(userId);

        public Task<Income> GetIncomeByIdAsync(int id, int userId) =>
            _incomeRepository.GetIncomeByIdAsync(id, userId);

        public Task AddIncomeAsync(Income income) =>
            _incomeRepository.AddIncomeAsync(income);

        public Task UpdateIncomeAsync(Income income) =>
            _incomeRepository.UpdateIncomeAsync(income);

        public Task DeleteIncomeAsync(int id, int userId) =>
            _incomeRepository.DeleteIncomeAsync(id, userId);
    }
}
