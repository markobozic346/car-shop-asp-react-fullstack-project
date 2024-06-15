using Microsoft.EntityFrameworkCore;
using servis_automobila.Contexts;
using servis_automobila.Models;

namespace servis_automobila.Services;

public class ServiceService
{
    private readonly ApplicationDbContext _context;

    public ServiceService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Service>> GetAllServicesAsync()
    {
        return await _context.Services.Include(s => s.Car).ThenInclude(c => c.User).ToListAsync();
    }

    public async Task<Service?> GetServiceByIdAsync(int id)
    {
        return await _context.Services.Include(s => s.Car).ThenInclude(c => c.User)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Service> CreateServiceAsync(Service service)
    {
        _context.Services.Add(service);
        await _context.SaveChangesAsync();
        return service;
    }

    public async Task<Service> UpdateServiceAsync(Service service)
    {
        _context.Entry(service).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return service;
    }

    public async Task DeleteServiceAsync(int id)
    {
        var service = await _context.Services.FindAsync(id);
        if (service != null)
        {
            _context.Services.Remove(service);
            await _context.SaveChangesAsync();
        }
    }
}