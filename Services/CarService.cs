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

    public async Task<List<Car>> GetAllCarsAsync()
    {
        return await _context.Cars.Include(c => c.User).Include(c => c.Services).ToListAsync();
    }

    public async Task<Car?> GetCarByIdAsync(int id)
    {
        return await _context.Cars.Include(c => c.User).Include(c => c.Services)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Car> CreateCarAsync(Car car)
    {
        _context.Cars.Add(car);
        await _context.SaveChangesAsync();
        return car;
    }

    public async Task<Car> UpdateCarAsync(Car car)
    {
        _context.Entry(car).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return car;
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
}