using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace servis_automobila.Models;

public enum ServiceStatus
    {
        Pending,
        Accepted,
        Canceled,
        Done
    }

public class Service 
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; } // "pending", "accepted", "canceled", "done"

        [Required]
        public int CarId { get; set; }

        [ForeignKey("CarId")]
        public Car Car { get; set; }
}
