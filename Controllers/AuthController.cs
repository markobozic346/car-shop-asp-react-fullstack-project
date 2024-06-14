using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using servis_automobila.Models;
using servis_automobila.Services;

namespace servis_automobila.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserService _userService;

        public AuthController(IConfiguration configuration, UserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel login)
        {
            try
            {
                // Validate credentials (e.g., from database)
                var user = await _userService.GetUserByUsernameAsync(login.Username);

                if (user == null || !VerifyPasswordHash(login.Password, user.PasswordHash, user.PasswordSalt))
                {
                    return Unauthorized(new { message = "Invalid username or password" });
                }

                // Generate JWT token
                var token = GenerateJwtToken(user.Username, user.Role);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request.", error = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel register)
        {
            try
            {
                // Check if the username is already taken
                if (_userService.IsUsernameTaken(register.Username))
                {
                    return Conflict(new { message = "Username is already taken" });
                }

                // Hash the password
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(register.Password, out passwordHash, out passwordSalt);

                // Save the user to the database
                var user = new User
                {
                    Username = register.Username,
                    Role = "user",
                    PasswordHash = Convert.ToBase64String(passwordHash),
                    PasswordSalt = Convert.ToBase64String(passwordSalt)
                };
                _userService.AddUser(user);

                // Generate JWT token
                var token = GenerateJwtToken(register.Username, user.Role);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request.", error = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            try
            {
                var username = HttpContext.User.Identity?.Name;
                var role = HttpContext.User.FindFirst(ClaimTypes.Role)?.Value;

                return Ok(new
                {
                    Username = username,
                    Role = role
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request.", error = ex.Message });
            }
        }

        private bool VerifyPasswordHash(string password, string passwordHashFromDb, string passwordSaltFromDb)
        {
            using var hmac = new HMACSHA512(Convert.FromBase64String(passwordSaltFromDb));
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Compare computed hash with the hash from the database
            return Convert.ToBase64String(computedHash) == passwordHashFromDb;
        }

        private string GenerateJwtToken(string username, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RegisterModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        // You can add more properties as needed, such as email, name, etc.
    }
}
