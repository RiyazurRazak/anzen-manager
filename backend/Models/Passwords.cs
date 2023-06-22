using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Passwords
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [ForeignKey("Devices")]
        public string DeviceId { get; set; }

        [Required]
        public string Cypher { get; set; }

        [Required]
        public string Label { get; set; }
    }
}
