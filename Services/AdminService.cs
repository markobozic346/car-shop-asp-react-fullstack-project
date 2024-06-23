using Microsoft.EntityFrameworkCore;
using servis_automobila.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using servis_automobila.Contexts;

public class AdminService
{
    private readonly ApplicationDbContext _context;

    public AdminService(ApplicationDbContext context)
    {
        _context = context;
    }

    // Users CRUD operations
    public async Task<List<User>> GetAllUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> CreateUserAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task UpdateUserAsync(User user)
    {
        _context.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }

    // Cars CRUD operations
    public async Task<List<Car>> GetAllCarsAsync()
    {
        return await _context.Cars.ToListAsync();
    }

    public async Task<Car> GetCarByIdAsync(int id)
    {
        return await _context.Cars.FindAsync(id);
    }

    public async Task<Car> CreateCarAsync(Car car)
    {
        _context.Cars.Add(car);
        await _context.SaveChangesAsync();
        return car;
    }

    public async Task UpdateCarAsync(Car car)
    {
        _context.Entry(car).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteCarAsync(int id)
    {
        var car = await _context.Cars.FindAsync(id);
        if (car != null)
        {
            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
        }
    }

    // Car Bodies CRUD operations
    public async Task<List<CarBody>> GetAllCarBodiesAsync()
    {
        return await _context.CarBodies.ToListAsync();
    }

    public async Task<CarBody> GetCarBodyByIdAsync(int id)
    {
        return await _context.CarBodies.FindAsync(id);
    }

    public async Task<CarBody> CreateCarBodyAsync(CarBody carBody)
    {
        _context.CarBodies.Add(carBody);
        await _context.SaveChangesAsync();
        return carBody;
    }

    public async Task UpdateCarBodyAsync(CarBody carBody)
    {
        _context.Entry(carBody).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteCarBodyAsync(int id)
    {
        var carBody = await _context.CarBodies.FindAsync(id);
        if (carBody != null)
        {
            _context.CarBodies.Remove(carBody);
            await _context.SaveChangesAsync();
        }
    }
}