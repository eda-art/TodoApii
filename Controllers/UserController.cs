using Microsoft.AspNetCore.Mvc;
using TodoApii.Data;
using TodoApii.Models;

namespace TodoApii.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly TodoContext _context;

        public UserController(TodoContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginUser)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Username == loginUser.Username && u.Password == loginUser.Password);

            if (user == null)
                return Unauthorized("Kullanıcı adı veya şifre yanlış.");

            return Ok(new { message = "Giriş başarılı", username = user.Username });
        }
    }
}