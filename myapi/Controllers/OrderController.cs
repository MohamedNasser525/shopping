using myapi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using static System.Reflection.Metadata.BlobBuilder;

namespace ApiShopping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("creat order")]
        public async Task<IActionResult> creat()
        {
            var order = new Order { totalcost = 0, status = "wait" };
            await _context.AddAsync(order);
            _context.SaveChanges();

            return Ok(new
            {
                massege = "order created ",
                orderId = order.Id,
                status = order.status

            });
        }

        [HttpGet("get all order")]
        public async Task<IActionResult> GetAllAsync()
        {
            var Orders = await _context.Orders.ToListAsync();
            return Ok(Orders);
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
            var all_o_i = await _context.OrderItems.Where(g => g.OrderId == o).ToListAsync();
            List<Item> newitem = new List<Item>();
            foreach (var x in all_o_i)
            {
                var item = await _context.Items.Where(item => item.Id == x.ItemId).ToListAsync();
                newitem.AddRange(item);
            }

            order.items = newitem;
            order.totalcost = newitem.Sum(item => item.cost);
            order.status = "in process";


            return Ok(new
            {
                massege = "ordered succeeded ",
                order
            });
        }

        [HttpPost("make order/{o}")]
        public async Task<IActionResult> postsync(int o,[FromForm]List<int>l)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(g => g.Id == o);
            if(order == null)
            {
                return BadRequest (new
                {
                    massege = " order id not correct ",
                    order_id=o
                });
            }
            if(l == null)
            {
                return BadRequest(new
                {
                    massege = "no items in order "
                });
            }
            //  var items = await _context.Items.Where(item => l.Contains(item.Id)).ToListAsync();
            List<Item> items = new List<Item>();
            foreach (var x in l)
            {
                 var item = await _context.Items.Where(item => item.Id==x).ToListAsync();
                items.AddRange(item);
            }

             
            if (items.Count==0)
            {
                return BadRequest(new
                {
                    massege = " items id not correct ",
                    items_id = l
                });
            }


            foreach(var i in items) {
                var o_i = new OrderItem { ItemId = i.Id, OrderId = o };

                await _context.OrderItems.AddAsync(o_i);

            }
            _context.SaveChanges();


            var all_o_i = await _context.OrderItems.Where(g => g.OrderId == o).ToListAsync();
            List<Item> newitem = new List<Item>();
            foreach (var x in all_o_i)
            {
                var item = await _context.Items.Where(item => item.Id == x.ItemId).ToListAsync();
                newitem.AddRange(item);
            }

            order.items = newitem;
            order.totalcost = newitem.Sum(item => item.cost);
            order.status = "in process";


            return Ok(new
            {
                massege = "ordered succeeded ",
                order
            });
          
        }

        [HttpDelete("Delete order/{o}")]
        public async Task<IActionResult> Delete(int o)
        {

            var order = await _context.Orders.Where(b => b.Id == o).FirstOrDefaultAsync();
            if (order == null)
            {
                return BadRequest(new
                {
                    massege = " order id not correct ",
                    order_id = o
                });
            }
            List<OrderItem> oi = new List<OrderItem>();
            oi = await _context.OrderItems.FromSqlInterpolated($"SELECT * FROM OrderItems WHERE OrderId = {o} ").ToListAsync();
            foreach (OrderItem b in oi)
                _context.OrderItems.Remove(b);

            _context.Orders.Remove(order);
            _context.SaveChanges();
            return Ok(new
            {
                massege = "order deleted succeeded ",
            });
        }

        [HttpDelete("Delete item from order/{o}")]
        public async Task<IActionResult> Deleteitem(int o,int i)
        {
            var order = await _context.Orders.Where(b => b.Id == o).FirstOrDefaultAsync();
            if (order == null)
            {
                return BadRequest(new
                {
                    massege = " order id not correct ",
                    order_id = o
                });
            } 

            var item = await _context.Items.Where(b => b.Id == i).FirstOrDefaultAsync();
            if (item == null)
            {
                return BadRequest($"item id not correct :{i}");
            }


            var OrderItem = await _context.OrderItems.Where(g => g.OrderId == o&& g.ItemId == i).FirstOrDefaultAsync(); ;
            _context.OrderItems.Remove(OrderItem);

            var oneitem = await _context.OrderItems.Where(g  => g.OrderId==o).ToListAsync();
            if (oneitem.Count == 0)
            {
                _context.Orders.Remove(order);
                return Ok("order removed");

            }
            _context.SaveChanges();

            var all_o_i = await _context.OrderItems.Where(g => g.OrderId == o).ToListAsync();
            List<Item> newitem = new List<Item>();
            foreach (var x in all_o_i)
            {
                var itemm = await _context.Items.Where(item => item.Id == x.ItemId).ToListAsync();
                newitem.AddRange(itemm);
            }

            order.items = newitem;
            order.totalcost = newitem.Sum(item => item.cost);
            order.status = "in process";


            return Ok(new
            {
                massege = "item deleted from order ",
                order
            });
        }


    }
}
