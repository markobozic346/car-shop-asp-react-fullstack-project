using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace servis_automobila.Models;

public class ToggleSavedCarDTO
{
    public int CarId { get; set; }
}
public class SavedCarDTO
{
    public int FavoriteId { get; set; }
    public int CarId { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    public int UserId { get; set; }
    public int CarBodyId { get; set; }
    public decimal Price { get; set; }
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