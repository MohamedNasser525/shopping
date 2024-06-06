using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myapi.Model;

namespace myapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }
        public class userbot
        {
            public string name { get; set; }
            public string mail { get; set; }
            public string password { get; set; }
        }

        [HttpPost("login")]
        public async Task<IActionResult> login([FromForm] userbot bot)
        {

            var user = await _context.Users.SingleOrDefaultAsync(s => s.mail == bot.mail);

            if (user != null)
            {
                return NotFound("Email are used !!!");
            }

            var newuser = new User
            {
                name = bot.name,
                mail = bot.mail,
                password = bot.password,
                

            };


            await _context.AddAsync(newuser);
            _context.SaveChanges();
            return Ok(newuser);
        }
        public class bot
        {
            public string name { get; set; }
            public string mail { get; set; }
            public string password { get; set; }
        }


        [HttpGet("register")]
        public async Task<IActionResult> Register([FromQuery] bot bot)
        {
            var user = await _context.Users.FirstOrDefaultAsync(s => s.mail == bot.mail);

            if (user == null)
            {
                return NotFound("Email or password Wrong !!!");
            }
            if (user.password != bot.password)
            {
                return NotFound("Email or password Wrong !!!");

            }
            return Ok("register sussed");
        }

    }
}
