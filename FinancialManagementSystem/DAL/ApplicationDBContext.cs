using Microsoft.EntityFrameworkCore;
using FinancialManagementSystem.Models;

namespace FinancialManagementSystem.DAL
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
