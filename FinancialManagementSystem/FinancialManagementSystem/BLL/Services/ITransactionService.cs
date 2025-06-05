using FinancialManagementSystem.DTOs;

namespace FinancialManagementSystem.BLL.Services
{
    public interface ITransactionService
    {
        Task<List<TransactionDto>> GetUserTransactionsAsync(int userId);
    }

}
