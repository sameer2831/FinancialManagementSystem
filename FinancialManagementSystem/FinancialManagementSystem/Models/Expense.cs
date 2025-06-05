using System.ComponentModel.DataAnnotations;

namespace FinancialManagementSystem.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        [EnumDataType(typeof(ExpenseCategory))]
        public ExpenseCategory Category { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int UserId { get; set; }
    }
    public enum ExpenseCategory
    {
        Rent,
        Groceries,
        Utilities,
        Transportation,
        Entertainment,
        Dining,
        Healthcare,
        Insurance,
        Education,
        Travel,
        Shopping,
        Subscriptions,
        Other
    }

}
