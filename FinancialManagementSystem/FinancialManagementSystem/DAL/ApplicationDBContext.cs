using Microsoft.EntityFrameworkCore;
using FinancialManagementSystem.Models;

namespace FinancialManagementSystem.DAL
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Income> Income { get; set; }
        public DbSet<Expense> Expense { get; set; }

        public DbSet<Budget> Budgets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Call base first or last

            modelBuilder.Entity<Income>()
                .Property(i => i.Category)
                .HasConversion<string>();

            modelBuilder.Entity<Expense>()
                .Property(e => e.Category)
                .HasConversion<string>();

            modelBuilder.Entity<Expense>()
                .Property(e => e.Amount)
                .HasColumnType("decimal(10,2)");

            modelBuilder.Entity<Income>()
                .Property(i => i.Amount)
                .HasColumnType("decimal(10,2)");
        }
    }
}
