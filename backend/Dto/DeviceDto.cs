using System.ComponentModel.DataAnnotations;

namespace backend.Dto
{
    public class AddDeviceDto
    {
        public string Identifier { get; set; }
        public string Model { get; set; }
    }
}
