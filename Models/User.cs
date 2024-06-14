using System.ComponentModel.DataAnnotations;

namespace servis_automobila.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string Username { get; set; }
    
    [Required]
    public string PasswordHash { get; set; }
    
    [Required]
    public string PasswordSalt { get; set; }
    
    [Required]
    [MaxLength(20)]
    public string Role { get; set; }
}