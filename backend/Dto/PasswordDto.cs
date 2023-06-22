using System.ComponentModel.DataAnnotations;

namespace backend.Dto
{
    public class AddPasswordDto
    {
        public string DeviceId { get; set; }

        public string Cypher { get; set; }

        public string Label { get; set; }
    }

    public class UpdatePasswordDto
    {
        public string Id { get; set; }
        public string Cypher { get; set; }
        public string Label { get; set; }
    }
}
