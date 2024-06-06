using System.ComponentModel.DataAnnotations.Schema;

namespace myapi.Model
{
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int totalcost { get; set; }=0;

        public string status { get; set; } = "wait";

        public List<Item> items { get; set; }
    }
}
