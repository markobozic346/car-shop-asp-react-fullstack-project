using Microsoft.EntityFrameworkCore;
using servis_automobila.Contexts;
using servis_automobila.Models;

namespace servis_automobila.Services;
    public class CarBodyService
    {
        private readonly ApplicationDbContext _context;

        public CarBodyService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<CarBody>> GetAllCarBodiesAsync()
        {
            return await _context.CarBodies.ToListAsync();
        }

        public async Task<CarBody> GetCarBodyByIdAsync(int id)
        {
            return await _context.CarBodies.FirstOrDefaultAsync(cb => cb.Id == id);
        }

        public async Task<CarBody> CreateCarBodyAsync(CarBody carBody)
        {
            _context.CarBodies.Add(carBody);
            await _context.SaveChangesAsync();
            return carBody;
        }

        public async Task UpdateCarBodyAsync(CarBody carBody)
        {
            var existingCarBody = await _context.CarBodies.FirstOrDefaultAsync(cb => cb.Id == carBody.Id);

            if (existingCarBody != null)
            {
                _context.Entry(existingCarBody).CurrentValues.SetValues(carBody);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteCarBodyAsync(int id)
        {
            var carBody = await _context.CarBodies.FirstOrDefaultAsync(cb => cb.Id == id);

            if (carBody != null)
            {
                _context.CarBodies.Remove(carBody);
                await _context.SaveChangesAsync();
            }
        }
    }