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

        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }

        // Users CRUD operations
        [HttpGet("users")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            var users = await _adminService.GetAllUsersAsync();
            return Ok(users);
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

        [HttpPost("users")]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var createdUser = await _adminService.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
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

        // Cars CRUD operations
        [HttpGet("cars")]
        public async Task<ActionResult<List<Car>>> GetAllCars()
        {
            var cars = await _adminService.GetAllCarsAsync();
            return Ok(cars);
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

        [HttpPost("cars")]
        public async Task<ActionResult<Car>> CreateCar(CarCreateDTO carCreateDTO)
        {
            var car = new Car
            {
                Make = carCreateDTO.Make,
                Model = carCreateDTO.Model,
                Year = carCreateDTO.Year,
                CarBodyId = carCreateDTO.CarBodyId,
                Price = carCreateDTO.Price // Add the price
            };

            var createdCar = await _adminService.CreateCarAsync(car);
            return CreatedAtAction(nameof(GetCarById), new { id = createdCar.Id }, createdCar);
        }

        [HttpPut("cars/{id}")]
        public async Task<IActionResult> UpdateCar(int id, CarUpdateDTO carUpdateDTO)
        {
            if (id != carUpdateDTO.Id)
            {
                return BadRequest();
            }

            // Retrieve the existing car from the database
            var existingCar = await _adminService.GetCarByIdAsync(id);
            if (existingCar == null)
            {
                return NotFound();
            }

            // Validate if the provided UserId exists in the Users table
            var user = await _adminService.GetUserByIdAsync(carUpdateDTO.UserId);
            if (user == null)
            {
                return BadRequest("User does not exist.");
            }

            // Update the car entity with the new values
            existingCar.Make = carUpdateDTO.Make;
            existingCar.Model = carUpdateDTO.Model;
            existingCar.Year = carUpdateDTO.Year;
            existingCar.CarBodyId = carUpdateDTO.CarBodyId;
            existingCar.Price = carUpdateDTO.Price;
            existingCar.UserId = carUpdateDTO.UserId; // Update the UserId as well

            // Call the service method to update the car
            await _adminService.UpdateCarAsync(existingCar);
            return NoContent();
        }

        [HttpDelete("cars/{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            await _adminService.DeleteCarAsync(id);
            return NoContent();
        }

        // Car Bodies CRUD operations
        [HttpGet("carbodies")]
        public async Task<ActionResult<List<CarBody>>> GetAllCarBodies()
        {
            var carBodies = await _adminService.GetAllCarBodiesAsync();
            return Ok(carBodies);
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

        [HttpPost("carbodies")]
        public async Task<ActionResult<CarBody>> CreateCarBody(CarBody carBody)
        {
            var createdCarBody = await _adminService.CreateCarBodyAsync(carBody);
            return CreatedAtAction(nameof(GetCarBodyById), new { id = createdCarBody.Id }, createdCarBody);
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
        
        [HttpDelete("savedcars/{id}")]
        public async Task<IActionResult> DeleteSavedCar(int id)
        {
            var result = await _adminService.DeleteSavedCarAsync(id);
            if (!result)
            {
                return NotFound("Saved car not found");
            }
            return NoContent();
        }
    }