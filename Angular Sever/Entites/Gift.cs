using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Diagnostics;
using System.Drawing;
using System.Xml.Linq;
using System.ComponentModel.DataAnnotations;

namespace Entites
{
    public class Gift
    {
        public int? Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }
        public int? Price { get; set; }
        public int? Donor { get; set; }
        public string? Category { get; set; }
        public string? Image { get; set; }
        public User? winner { get; set; }
        public List<User>? Users { get; set; }

        public Gift() {
            Users  = new List<User>();
        }
    }
    public class GiftCart
    {
        public int Id { get; set; }
        public int Amount { get; set; }
    }
}

