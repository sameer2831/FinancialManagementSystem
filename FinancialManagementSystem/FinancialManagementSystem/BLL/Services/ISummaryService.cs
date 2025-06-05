using FinancialManagementSystem.DTOs;
namespace FinancialManagementSystem.BLL.Services
{
    public interface ISummaryService
    {
        Task<MonthlySummaryDto> GetMonthlySummaryAsync(int userId);
        Task<CategorySummaryDto> GetCategoryBreakdownAsync(int userId);
        Task<List<MonthlyTrendDto>> GetMonthlyTrendsAsync(int userId);
    }
}
