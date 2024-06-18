using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using servis_automobila.Models;
using servis_automobila.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "admin")]
public class AdminController : ControllerBase
{
    private readonly AdminService _adminService;

    public class UpdateCarViewModel
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public int UserId { get; set; }
        public int CarBodyId { get; set; }
    }
    public AdminController(AdminService adminService)
    {
        _adminService = adminService;
    }
 [HttpGet("users")]
    public async Task<ActionResult<List<User>>> GetAllUsers()
    {
        var users = await _adminService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpPost("users")]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        var createdUser = await _adminService.CreateUserAsync(user);
        return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
    }

    [HttpGet("users/{id}")]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        var user = await _adminService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpPut("users/{id}")]
    public async Task<IActionResult> UpdateUser(int id, User user)
    {
        if (id != user.Id)
        {
            return BadRequest();
        }

        await _adminService.UpdateUserAsync(user);
        return NoContent();
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        await _adminService.DeleteUserAsync(id);
        return NoContent();
    }

    // Cars Endpoints

    [HttpGet("cars")]
    public async Task<ActionResult<List<Car>>> GetAllCars()
    {
        var cars = await _adminService.GetAllCarsAsync();
        return Ok(cars);
    }

    [HttpPost("cars")]
    public async Task<ActionResult<Car>> CreateCar(Car car)
    {
        var createdCar = await _adminService.CreateCarAsync(car);
        return CreatedAtAction(nameof(GetCarById), new { id = createdCar.Id }, createdCar);
    }

    [HttpGet("cars/{id}")]
    public async Task<ActionResult<Car>> GetCarById(int id)
    {
        var car = await _adminService.GetCarByIdAsync(id);
        if (car == null)
        {
            return NotFound();
        }
        return Ok(car);
    }

    [HttpPut("cars/{id}")]
    public async Task<IActionResult> UpdateCar(int id, UpdateCarViewModel model)
    {
        if (id != model.Id)
        {
            return BadRequest();
        }

        var car = await _adminService.GetCarByIdAsync(id);
        if (car == null)
        {
            return NotFound();
        }

        car.Make = model.Make;
        car.Model = model.Model;
        car.Year = model.Year;
        car.UserId = model.UserId;
        car.CarBodyId = model.CarBodyId;

        await _adminService.UpdateCarAsync(car);
        return NoContent();
    }

    [HttpDelete("cars/{id}")]
    public async Task<IActionResult> DeleteCar(int id)
    {
        await _adminService.DeleteCarAsync(id);
        return NoContent();
    }

    // Car Bodies Endpoints

    [HttpGet("carbodies")]
    public async Task<ActionResult<List<CarBody>>> GetAllCarBodies()
    {
        var carBodies = await _adminService.GetAllCarBodiesAsync();
        return Ok(carBodies);
    }

    [HttpPost("carbodies")]
    public async Task<ActionResult<CarBody>> CreateCarBody(CarBody carBody)
    {
        var createdCarBody = await _adminService.CreateCarBodyAsync(carBody);
        return CreatedAtAction(nameof(GetCarBodyById), new { id = createdCarBody.Id }, createdCarBody);
    }

    [HttpGet("carbodies/{id}")]
    public async Task<ActionResult<CarBody>> GetCarBodyById(int id)
    {
        var carBody = await _adminService.GetCarBodyByIdAsync(id);
        if (carBody == null)
        {
            return NotFound();
        }
        return Ok(carBody);
    }

    [HttpPut("carbodies/{id}")]
    public async Task<IActionResult> UpdateCarBody(int id, CarBody carBody)
    {
        if (id != carBody.Id)
        {
            return BadRequest();
        }

        await _adminService.UpdateCarBodyAsync(carBody);
        return NoContent();
    }

    [HttpDelete("carbodies/{id}")]
    public async Task<IActionResult> DeleteCarBody(int id)
    {
        await _adminService.DeleteCarBodyAsync(id);
        return NoContent();
    }
}
