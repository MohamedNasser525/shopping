using System.ComponentModel.DataAnnotations.Schema;

namespace myapi.Model
{
    public class User
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string name { get; set; }
        public string mail { get; set; }
        public string password { get; set; }
    }
}
