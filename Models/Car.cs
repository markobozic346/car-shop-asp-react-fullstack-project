using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace servis_automobila.Models;
public class CarCreateDTO
{
    public string Make { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    public int CarBodyId { get; set; }
    public decimal Price { get; set; }
}

public class CarUpdateDTO
{
    public int Id { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    public int CarBodyId { get; set; }
    public decimal Price { get; set; }
    
    public int UserId { get; set; }
}

public class CarDTO
{
    public int Id { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    public int UserId { get; set; }
    public int CarBodyId { get; set; }
    public decimal Price { get; set; }
}

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

    public int CarBodyId { get; set; }

    [ForeignKey("CarBodyId")]
    public CarBody CarBody { get; set; }

    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }
    
    public ICollection<SavedCar> SavedByUsers { get; set; }
}