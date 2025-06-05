using FinancialManagementSystem.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace FinancialManagementSystem.DAL.RepositoryServices
{
    public interface IIncomeRepository
    {
        Task<IEnumerable<Income>> GetIncomesByUserAsync(int userId);
        Task<Income> GetIncomeByIdAsync(int id, int userId);
        Task AddIncomeAsync(Income income);
        Task UpdateIncomeAsync(Income income);
        Task DeleteIncomeAsync(int id, int userId);
    }
}
