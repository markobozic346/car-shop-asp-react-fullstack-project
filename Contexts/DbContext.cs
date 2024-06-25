using Microsoft.EntityFrameworkCore;
using servis_automobila.Models;
using servis_automobila.Seeders;

namespace servis_automobila.Contexts;

public class ApplicationDbContext: DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Car> Cars { get; set; }
    public DbSet<SavedCar> SavedCars { get; set; }
    public DbSet<CarBody> CarBodies { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply configurations, relations, etc.
        modelBuilder.Entity<Car>().ToTable("Cars");
        modelBuilder.Entity<CarBody>().ToTable("CarBodies");
        modelBuilder.Entity<User>().ToTable("Users");
        modelBuilder.Entity<SavedCar>().ToTable("SavedCars");

        // Apply seed data using the seeder class
        DatabaseSeeder.Seed(modelBuilder);
    }
    
}