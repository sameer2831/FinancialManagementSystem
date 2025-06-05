namespace FinancialManagementSystem.DTOs
{
    public class TransactionDto
    {
        public DateTime Date { get; set; }
        public string Type { get; set; } // "Income" or "Expense"
        public string Category { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
    }

}
