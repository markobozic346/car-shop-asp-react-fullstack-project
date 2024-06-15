using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using servis_automobila.Models;
using servis_automobila.Services;

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

    [HttpGet]
    public async Task<ActionResult<List<Car>>> GetAll()
    {
        var cars = await _carService.GetAllCarsAsync();
        return Ok(cars);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Car>> GetById(int id)
    {
        var car = await _carService.GetCarByIdAsync(id);
        if (car == null)
        {
            return NotFound();
        }
        return Ok(car);
    }

    [HttpPost]
    public async Task<ActionResult<Car>> Create(Car car)
    {
        var createdCar = await _carService.CreateCarAsync(car);
        return CreatedAtAction(nameof(GetById), new { id = createdCar.Id }, createdCar);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Car car)
    {
        if (id != car.Id)
        {
            return BadRequest();
        }

        await _carService.UpdateCarAsync(car);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _carService.DeleteCarAsync(id);
        return NoContent();
    }
}