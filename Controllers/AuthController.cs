using Microsoft.AspNetCore.Mvc;
using TodoApii.Data;
using TodoApii.Models;

namespace TodoApii.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TodoContext _context;

        public AuthController(TodoContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var existingUser = _context.Users
                .FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);

            if (existingUser != null)
            {
                return Ok("Giriş başarılı");
            }

            return Unauthorized("Geçersiz kullanıcı adı veya şifre");
        }
    }
}
