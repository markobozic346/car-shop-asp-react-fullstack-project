using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace servis_automobila.Models;

public class CarBody
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Type { get; set; }
}