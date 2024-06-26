using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using servis_automobila.Models;
using servis_automobila.Services;
using CarCreateDTO = servis_automobila.Models.CarCreateDTO;

namespace servis_automobila.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class CarController : ControllerBase
{
    private readonly CarService _carService;

    public CarController(CarService carService)
    {
        _carService = carService;
    }

    private CarDTO ConvertToDTO(Car car)
    {
        return new CarDTO
        {
            Id = car.Id,
            Make = car.Make,
            Model = car.Model,
            Year = car.Year,
            UserId = car.UserId,
            CarBodyId = car.CarBodyId,
            Price = car.Price
        };
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CarDTO>> GetById(int id)
    {
        var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized();
        }

        var car = await _carService.GetCarByIdAsync(id, userId);
        if (car == null)
        {
            return NotFound();
        }

        var carDTO = ConvertToDTO(car);
        return Ok(carDTO);
    }

    [HttpGet("mycars")]
    public async Task<ActionResult<List<CarDTO>>> GetAllUserCars()
    {
        var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);

        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized();
        }

        var cars = await _carService.GetAllUserCarsAsync(userId);
        var carDTOs = cars.Select(c => ConvertToDTO(c)).ToList();
        return Ok(carDTOs);
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<CarDTO>>> GetAll()
    {
        var cars = await _carService.GetAllCarsAsync();
        var carDTOs = cars.Select(c => ConvertToDTO(c)).ToList();
        return Ok(carDTOs);
    }

    [HttpPost]
    public async Task<ActionResult<CarDTO>> Create(CarCreateDTO carCreateDTO)
    {
        var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized();
        }

        var createdCar = await _carService.CreateCarAsync(carCreateDTO, userId);
        var carDTO = ConvertToDTO(createdCar);
        return CreatedAtAction(nameof(GetById), new { id = carDTO.Id }, carDTO);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, CarUpdateDTO carUpdateDTO)
    {
        if (id != carUpdateDTO.Id)
        {
            return BadRequest();
        }

        var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized();
        }

        var car = new Car
        {
            Id = carUpdateDTO.Id,
            Make = carUpdateDTO.Make,
            Model = carUpdateDTO.Model,
            Year = carUpdateDTO.Year,
            CarBodyId = carUpdateDTO.CarBodyId,
            UserId = userId,
            Price = carUpdateDTO.Price
        };

        await _carService.UpdateCarAsync(car, userId);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized();
        }

        await _carService.DeleteCarAsync(id, userId);
        return NoContent();
    }

    [HttpGet("paginated")]
    [AllowAnonymous] // Adjust authorization as per your requirements
    public async Task<ActionResult<List<CarDTO>>> GetPaginatedCars(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string search = null) // New parameter for search
    {
        var cars = await _carService.GetPaginatedCarsAsync(page, pageSize, search);
        var carDTOs = cars.Select(c => ConvertToDTO(c)).ToList();
        return Ok(carDTOs);
    }
}