using FinancialManagementSystem.BLL.Services;
using FinancialManagementSystem.DAL.RepositoryServices;
using FinancialManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace FinancialManagementSystem.BLL
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public bool Register(User user)
        {
            if (_userRepository.GetUserByUsername(user.Username) != null)
                return false;

            // Hash password before saving (use BCrypt or similar)
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            _userRepository.AddUser(user);
            return true;
        }

        public User Authenticate(string username, string password)
        {
            var user = _userRepository.GetUserByUsername(username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                return null;

            return user;
        }
        public bool GeneratePasswordResetToken(string email, out string token)
        {
            return _userRepository.GeneratePasswordResetToken(email, out token);
        }

        public bool ResetPassword(string token, string newPassword)
        {
            string setpassword = BCrypt.Net.BCrypt.HashPassword(newPassword);
            return _userRepository.ResetPassword(token, setpassword);
        }

    }

}
