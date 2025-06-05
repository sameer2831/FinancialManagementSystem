using FinancialManagementSystem.Models;

namespace FinancialManagementSystem.DAL.RepositoryServices
{
    public interface IUserRepository
    {
        User GetUserByUsername(string username);
        void AddUser(User user);
        bool GeneratePasswordResetToken(string email, out string token);
        bool ResetPassword(string token, string newPassword);
    }
}
