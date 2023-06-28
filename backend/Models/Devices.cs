using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Devices
    {
        [Key]
        public string Identifier { get; set; }

        [Required]
        public string Model { get; set; }
    }
}
