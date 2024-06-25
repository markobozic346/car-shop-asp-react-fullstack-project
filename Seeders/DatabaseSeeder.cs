using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using servis_automobila.Models;

namespace servis_automobila.Seeders;

public static class DatabaseSeeder
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        // Seed CarBodies
        modelBuilder.Entity<CarBody>().HasData(
            new CarBody { Id = 1, Type = "Sedan" },
            new CarBody { Id = 2, Type = "SUV" },
            new CarBody { Id = 3, Type = "Hatchback" },
            new CarBody { Id = 4, Type = "Convertible" },
            new CarBody { Id = 5, Type = "Coupe" },
            new CarBody { Id = 6, Type = "Minivan" },
            new CarBody { Id = 7, Type = "Truck" }
        );

        // Seed Users
        var adminPassword = "admin";
        var user1Password = "user1";
        var user2Password = "user2";
        var user3Password = "user3";
        var user4Password = "user4";
        var user5Password = "user5";
        var user6Password = "user6";
        var user7Password = "user7";

        byte[] adminPasswordHash,
            adminPasswordSalt,
            user1PasswordHash,
            user1PasswordSalt,
            user2PasswordHash,
            user2PasswordSalt,
            user3PasswordHash,
            user3PasswordSalt,
            user4PasswordHash,
            user4PasswordSalt,
            user5PasswordHash,
            user5PasswordSalt,
            user6PasswordHash,
            user6PasswordSalt,
            user7PasswordHash,
            user7PasswordSalt;

        CreatePasswordHash(adminPassword, out adminPasswordHash, out adminPasswordSalt);
        CreatePasswordHash(user1Password, out user1PasswordHash, out user1PasswordSalt);
        CreatePasswordHash(user2Password, out user2PasswordHash, out user2PasswordSalt);
        CreatePasswordHash(user3Password, out user3PasswordHash, out user3PasswordSalt);
        CreatePasswordHash(user4Password, out user4PasswordHash, out user4PasswordSalt);
        CreatePasswordHash(user5Password, out user5PasswordHash, out user5PasswordSalt);
        CreatePasswordHash(user6Password, out user6PasswordHash, out user6PasswordSalt);
        CreatePasswordHash(user7Password, out user7PasswordHash, out user7PasswordSalt);

        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1000, Username = "admin", PasswordHash = Convert.ToBase64String(adminPasswordHash),
                PasswordSalt = Convert.ToBase64String(adminPasswordSalt), Role = "admin"
            },
            new User
            {
                Id = 1001, Username = "user1", PasswordHash = Convert.ToBase64String(user1PasswordHash),
                PasswordSalt = Convert.ToBase64String(user1PasswordSalt), Role = "user"
            },
            new User
            {
                Id = 1002, Username = "user2", PasswordHash = Convert.ToBase64String(user2PasswordHash),
                PasswordSalt = Convert.ToBase64String(user2PasswordSalt), Role = "user"
            },
            new User
            {
                Id = 1003, Username = "user3", PasswordHash = Convert.ToBase64String(user3PasswordHash),
                PasswordSalt = Convert.ToBase64String(user3PasswordSalt), Role = "user"
            },
            new User
            {
                Id = 1004, Username = "user4", PasswordHash = Convert.ToBase64String(user4PasswordHash),
                PasswordSalt = Convert.ToBase64String(user4PasswordSalt), Role = "user"
            },
            new User
            {
                Id = 1005, Username = "user5", PasswordHash = Convert.ToBase64String(user5PasswordHash),
                PasswordSalt = Convert.ToBase64String(user5PasswordSalt), Role = "user"
            },
            new User
            {
                Id = 1006, Username = "user6", PasswordHash = Convert.ToBase64String(user6PasswordHash),
                PasswordSalt = Convert.ToBase64String(user6PasswordSalt), Role = "user"
            },
            new User
            {
                Id = 1007, Username = "user7", PasswordHash = Convert.ToBase64String(user7PasswordHash),
                PasswordSalt = Convert.ToBase64String(user7PasswordSalt), Role = "user"
            }
        );

        // Seed Cars
        modelBuilder.Entity<Car>().HasData(
            new Car
            {
                Id = 1, Make = "Toyota", Model = "Camry", Year = 2020, CarBodyId = 1, Price = 24000m, UserId = 2
            },
            new Car { Id = 2, Make = "Honda", Model = "CR-V", Year = 2021, CarBodyId = 2, Price = 30000m, UserId = 2 },
            new Car { Id = 3, Make = "Ford", Model = "Fusion", Year = 2019, CarBodyId = 1, Price = 22000m, UserId = 3 },
            new Car
            {
                Id = 4, Make = "Chevrolet", Model = "Malibu", Year = 2018, CarBodyId = 1, Price = 20000m, UserId = 4
            },
            new Car
            {
                Id = 5, Make = "Nissan", Model = "Altima", Year = 2020, CarBodyId = 1, Price = 23000m, UserId = 5
            },
            new Car { Id = 6, Make = "Toyota", Model = "Rav4", Year = 2021, CarBodyId = 2, Price = 31000m, UserId = 6 },
            new Car
            {
                Id = 7, Make = "Honda", Model = "Accord", Year = 2022, CarBodyId = 1, Price = 28000m, UserId = 7
            },
            new Car
            {
                Id = 8, Make = "Hyundai", Model = "Elantra", Year = 2020, CarBodyId = 1, Price = 21000m, UserId = 8
            }
        );

        // Seed SavedCars
        modelBuilder.Entity<SavedCar>().HasData(
            new SavedCar { Id = 1, UserId = 2, CarId = 1 },
            new SavedCar { Id = 2, UserId = 3, CarId = 2 },
            new SavedCar { Id = 3, UserId = 4, CarId = 3 },
            new SavedCar { Id = 4, UserId = 5, CarId = 4 },
            new SavedCar { Id = 5, UserId = 6, CarId = 5 },
            new SavedCar { Id = 6, UserId = 7, CarId = 6 },
            new SavedCar { Id = 7, UserId = 8, CarId = 7 }
        );
    }

    private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
    }
}