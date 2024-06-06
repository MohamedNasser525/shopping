using myapi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiShopping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("view")]
        public async Task<IActionResult> GetAllAsync()
        {
            var items = await _context.Items.ToListAsync();
            return Ok(items);
        }
         

        [HttpPost("add")]
        public async Task<IActionResult> postsync(string n,int c)
        {
            var item = new Item { name = n, cost = c };
            await _context.AddAsync(item);
            _context.SaveChanges();

            return Ok(new{
                massege= "item added succeeded ",
                item});

        }

       public class botitem
        {
            public string Name { get; set; }
            public int Cost { get; set; }
        }

        [HttpPut("update{id}")] 
        public async Task<IActionResult> updateAsync(int id, [FromBody] botitem b)
        {
            var item = await _context.Items.SingleOrDefaultAsync(g => g.Id == id);
            if (item == null)
            {
                return NotFound($"$your id is not correct :{id}");
            }
            item.name = b.Name;
            item.cost = b.Cost;
            _context.SaveChanges();
            return Ok(new
            {
                massege = "item updated succeeded ",
                item
            });
        }


        [HttpDelete("Delete/{id}")] 
        public async Task<IActionResult> deleteAsync(int id)
        {
            var item = await _context.Items.SingleOrDefaultAsync(g => g.Id == id);
            if (item == null)
            {
                return NotFound($"item id not correct :{id}");
            }
            _context.Items.Remove(item);
            _context.SaveChanges();
            return Ok(new{
                massege = "item deleted succeeded ",
                item
            });
        }

    }
}
