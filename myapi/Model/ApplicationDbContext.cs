using Microsoft.EntityFrameworkCore;


namespace myapi.Model
{
    
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Item> Items { get; set; }
       public DbSet<OrderItem> OrderItems { get; set; }
		public DbSet<Payment> Payments { get; set; }
		public DbSet<User> Users { get; set; }
	}
}
