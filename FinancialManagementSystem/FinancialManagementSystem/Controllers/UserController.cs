using FinancialManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using FinancialManagementSystem.BLL.Services;
using FinancialManagementSystem.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using FinancialManagementSystem.BLL;


namespace FinancialManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly ITokenBlacklistService _tokenBlacklistService;

        public UserController(IUserService userService, IConfiguration configuration, ITokenBlacklistService tokenBlacklistService)
        {
            _userService = userService;
            _configuration = configuration;
            _tokenBlacklistService = tokenBlacklistService;
        }

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            if (_userService.Register(user))
                return Ok("User registered");
            else
                return BadRequest("User already exists");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto login)
        {
            var user = _userService.Authenticate(login.Username, login.Password);
            if (user == null)
                return Unauthorized();

            // ✅ Generate JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                    // Add more claims as needed
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return Ok(new { Token = jwtToken });
        }

        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword([FromBody] ForgotPasswordDto dto)
        {
            if (_userService.GeneratePasswordResetToken(dto.Email, out string token))
            {
                //var resetLink = $"https://yourfrontend.com/reset-password?token={token}";
                // TODO: Send email with this link
                var resetLink = $"http://localhost:3000/reset-password?token={token}";

                // Log for local testing
                Console.WriteLine("Password reset link: " + resetLink);

                // Return the link in the response ONLY during local dev
                return Ok(new { message = "Reset link generated.", resetLink });
            }
            return NotFound("Email not found.");
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword([FromBody] ResetPasswordDto dto)
        {
            if (_userService.ResetPassword(dto.Token, dto.NewPassword))
                return Ok("Password reset successful.");
            return BadRequest("Invalid or expired token.");
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var expiry = TimeSpan.FromMinutes(60); // Match token lifespan

            await _tokenBlacklistService.BlacklistTokenAsync(token, expiry);

            return Ok(new { message = "Logged out successfully." });
        }


    }
}
