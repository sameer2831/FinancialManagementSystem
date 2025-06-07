namespace FinancialManagementSystem.Models
{
    public class Budget
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; }
        public string PeriodType { get; set; } // "Monthly" or "Yearly"
        public DateTime Period { get; set; }   // Month/year reference
    }

}
