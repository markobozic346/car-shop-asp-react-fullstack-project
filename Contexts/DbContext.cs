using Microsoft.EntityFrameworkCore;
using servis_automobila.Models;

namespace servis_automobila.Contexts;

public class ApplicationDbContext: DbContext
{
    public DbSet<User> Users { get; set; }
    
    public ApplicationDbContext (DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

   
}