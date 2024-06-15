using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace servis_automobila.Models;

public class Car
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Make { get; set; }

    [Required]
    [MaxLength(50)]
    public string Model { get; set; }

    [Required]
    public int Year { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; }

    public ICollection<Service> Services { get; set; } = new List<Service>();
}