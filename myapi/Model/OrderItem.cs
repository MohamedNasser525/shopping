using System.ComponentModel.DataAnnotations.Schema;

namespace myapi.Model
{
    public class OrderItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int OrderId { get; set; }    
        public int ItemId { get; set; }
    }
}
