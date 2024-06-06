using System.ComponentModel.DataAnnotations.Schema;

namespace myapi.Model
{
    public class Payment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Nameofvisa { get; set; }
        public int numberofvisa { get; set; }

        public int orderid { get; set; }


    }
}
