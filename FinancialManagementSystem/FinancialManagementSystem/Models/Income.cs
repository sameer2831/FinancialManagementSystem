using System.ComponentModel.DataAnnotations;

namespace FinancialManagementSystem.Models
{
    public class Income
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        [EnumDataType(typeof(IncomeCategory))]
        public IncomeCategory Category { get; set; }


        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int UserId { get; set; }
    }
    public enum IncomeCategory
    {
        Salary,
        Freelancing,
        Business,
        Investment,
        RentalIncome,
        Gifts,
        Refunds,
        Interests,
        Others
    }
}
