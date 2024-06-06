using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myapi.Model;

using System.ComponentModel.DataAnnotations.Schema;

namespace pay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PayController(ApplicationDbContext context)
        {
            _context = context;
        }

		[HttpGet("get my order/{o}")]
		public async Task<IActionResult> GetmyAsync(int o)
		{
			var order = await _context.Orders.SingleOrDefaultAsync(g => g.Id == o);
			if (order == null)
			{
				return BadRequest(new
				{
					massege = " order id not correct ",
					order_id = o
				});
			}



			return Ok(new
			{
				massege = "your order ",
				order
			});
		}


		public class dto
        {
            public string Nameofvisa { get; set; }
            public int numberofvisa { get; set; }

        }

        [HttpPost("{o}")]
		public async Task<IActionResult> pay(int o, [FromBody] dto d)
		{
			var order = await _context.Orders.SingleOrDefaultAsync(g => g.Id == o);
			if (order == null)
			{
				return BadRequest(new
				{
					massege = " order id not correct ",
					order_id = o
				});
			}

			var all_o_i = await _context.OrderItems.Where(g => g.OrderId == o).ToListAsync();
			List<Item> newitem = new List<Item>();
			foreach (var x in all_o_i)
			{
				var item = await _context.Items.Where(item => item.Id == x.ItemId).ToListAsync();
				newitem.AddRange(item);
			}

			order.items = newitem;
			order.totalcost = newitem.Sum(item => item.cost);
			order.status = "DONE";
			var newpay = new Payment
			{
				numberofvisa = d.numberofvisa,
				Nameofvisa = d.Nameofvisa,
				orderid = o
			};

			await _context.AddAsync(newpay);
			_context.SaveChanges();

			return Ok(new
			{
				massege = "payment sucssed",
				order,
				newpay
			});

		}

	}
}
