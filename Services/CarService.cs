using Microsoft.EntityFrameworkCore;
using servis_automobila.Contexts;
using servis_automobila.Models;

namespace servis_automobila.Services;

public class CarService
{
    private readonly ApplicationDbContext _context;

    public CarService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Car>> GetAllUserCarsAsync(int userId)
    {
        return await _context.Cars
            .Where(c => c.UserId == userId)
            .ToListAsync();
    }

    public async Task<List<Car>> GetAllCarsAsync()
    {
        return await _context.Cars
            .Include(c => c.User) // Include User if you need user information in the car listing
            .ToListAsync();
    }

    public async Task<Car> GetCarByIdAsync(int id, int userId)
    {
        return await _context.Cars
            .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
    }

    public async Task<Car> CreateCarAsync(CarCreateDTO carCreateDTO, int userId)
    {
        var car = new Car
        {
            Make = carCreateDTO.Make,
            Model = carCreateDTO.Model,
            Year = carCreateDTO.Year,
            CarBodyId = carCreateDTO.CarBodyId,
            UserId = userId, // Set the user ID for the new car
            Price = carCreateDTO.Price // Set the price
        };

        _context.Cars.Add(car);
        await _context.SaveChangesAsync();
        return car;
    }

    public async Task UpdateCarAsync(Car car, int userId)
    {
        var existingCar = await _context.Cars
            .FirstOrDefaultAsync(c => c.Id == car.Id && c.UserId == userId);

        if (existingCar != null)
        {
            existingCar.Make = car.Make;
            existingCar.Model = car.Model;
            existingCar.Year = car.Year;
            existingCar.CarBodyId = car.CarBodyId;
            existingCar.Price = car.Price; // Update the price

            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteCarAsync(int id, int userId)
    {
        var car = await _context.Cars
            .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

        if (car != null)
        {
            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<Car>> GetPaginatedCarsAsync(int page, int pageSize, string search = null)
    {
        IQueryable<Car> query = _context.Cars;

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(c =>
                    c.Make.Contains(search) ||
                    c.Model.Contains(search) ||
                    c.Year.ToString().Contains(search) ||
                    c.Price.ToString().Contains(search)
            );
        }

        return await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
}