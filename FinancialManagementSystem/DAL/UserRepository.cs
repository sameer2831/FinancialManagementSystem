using FinancialManagementSystem.Models;

namespace FinancialManagementSystem.DAL
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User GetUserByUsername(string username)
        {
            return _context.Users.FirstOrDefault(u => u.Username == username);
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        public bool GeneratePasswordResetToken(string email, out string token)
        {
            token = string.Empty;
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null) return false;

            token = Guid.NewGuid().ToString();
            user.ResetToken = token;
            user.ResetTokenExpiry = DateTime.UtcNow.AddHours(1);
            _context.SaveChanges();
            return true;
        }

        public bool ResetPassword(string token, string newPassword)
        {
            var user = _context.Users.FirstOrDefault(u =>
                u.ResetToken == token && u.ResetTokenExpiry > DateTime.UtcNow);
            if (user == null) return false;

            user.PasswordHash = newPassword; // 🔐 Should hash in production
            user.ResetToken = null;
            user.ResetTokenExpiry = null;
            _context.SaveChanges();
            return true;
        }

    }

}
