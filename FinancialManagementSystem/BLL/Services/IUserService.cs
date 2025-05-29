using FinancialManagementSystem.Models;

namespace FinancialManagementSystem.BLL.Services
{
    public interface IUserService
    {
        bool Register(User user);
        User Authenticate(string username, string password);
        bool GeneratePasswordResetToken(string email, out string token);
        bool ResetPassword(string token, string newPassword);

    }
}
