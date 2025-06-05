namespace FinancialManagementSystem.DTOs
{
    public class CategorySummaryDto
    {
        public Dictionary<string, decimal> IncomeByCategory { get; set; }
        public Dictionary<string, decimal> ExpenseByCategory { get; set; }
    }
}
