namespace FinancialManagementSystem.DTOs
{
    public class MonthlySummaryDto
    {
        public string Month { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal TotalExpense { get; set; }
        public decimal NetBalance { get; set; }
    }
}
