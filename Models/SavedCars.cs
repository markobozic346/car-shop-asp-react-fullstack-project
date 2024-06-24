using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace servis_automobila.Models;

public class ToggleSavedCarDTO
{
    public int CarId { get; set; }
}

public class SavedCar
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; }

    [Required]
    public int CarId { get; set; }

    [ForeignKey("CarId")]
    public Car Car { get; set; }
}