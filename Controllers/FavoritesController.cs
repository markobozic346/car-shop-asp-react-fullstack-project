using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servis_automobila.Contexts;
using servis_automobila.Models;

namespace servis_automobila.Controllers;
[ApiController]
[Route("[controller]")]
[Authorize]
public class FavoritesController : Controller
{
    private readonly ApplicationDbContext _context;

    public FavoritesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("toggle")]
    public async Task<ActionResult> ToggleSavedCar([FromBody] ToggleSavedCarDTO dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var carId = dto.CarId;

        var savedCar = await _context.SavedCars
            .FirstOrDefaultAsync(sc => sc.UserId == userId && sc.CarId == carId);

        if (savedCar != null)
        {
            _context.SavedCars.Remove(savedCar);
        }
        else
        {
            savedCar = new SavedCar
            {
                UserId = userId,
                CarId = carId
            };
            _context.SavedCars.Add(savedCar);
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }
    
    [HttpGet("my")]
    public async Task<ActionResult<List<CarDTO>>> GetMySavedCars()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        var savedCars = await _context.SavedCars
            .Where(sc => sc.UserId == userId)
            .Include(sc => sc.Car)
            .Select(sc => new CarDTO
            {
                Id = sc.Car.Id,
                Make = sc.Car.Make,
                Model = sc.Car.Model,
                Year = sc.Car.Year,
                UserId = sc.Car.UserId,
                CarBodyId = sc.Car.CarBodyId,
                Price = sc.Car.Price
            })
            .ToListAsync();

        return Ok(savedCars);
    }
}