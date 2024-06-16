using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using servis_automobila.Models;
using servis_automobila.Services;

namespace servis_automobila.Controllers;
[ApiController]
[Route("[controller]")]
[AllowAnonymous]
public class CarBodyController : ControllerBase
{
    private readonly CarBodyService _carBodyService;

    public CarBodyController(CarBodyService carBodyService)
    {
        _carBodyService = carBodyService;
    }

    [HttpGet]
    public async Task<ActionResult<List<CarBody>>> GetAll()
    {
        var carBodies = await _carBodyService.GetAllCarBodiesAsync();
        return Ok(carBodies);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CarBody>> GetById(int id)
    {
        var carBody = await _carBodyService.GetCarBodyByIdAsync(id);
        if (carBody == null)
        {
            return NotFound();
        }
        return Ok(carBody);
    }

    [HttpPost]
    public async Task<ActionResult<CarBody>> Create([FromBody] CarBody carBody)
    {
        var createdCarBody = await _carBodyService.CreateCarBodyAsync(carBody);
        return CreatedAtAction(nameof(GetById), new { id = createdCarBody.Id }, createdCarBody);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CarBody carBody)
    {
        if (id != carBody.Id)
        {
            return BadRequest();
        }

        await _carBodyService.UpdateCarBodyAsync(carBody);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _carBodyService.DeleteCarBodyAsync(id);
        return NoContent();
    }
}