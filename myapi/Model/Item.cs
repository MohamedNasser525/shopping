using System.ComponentModel.DataAnnotations.Schema;

namespace myapi.Model
{
    public class Item
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string name { get; set; }
        public int cost { get; set; }
        
    }
}
