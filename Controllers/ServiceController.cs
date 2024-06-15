using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using servis_automobila.Models;
using servis_automobila.Services;

namespace servis_automobila.Controllers;

    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ServiceController : ControllerBase
    {
        private readonly ServiceService _serviceService;

        public ServiceController(ServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Service>>> GetAll()
        {
            var services = await _serviceService.GetAllServicesAsync();
            return Ok(services);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Service>> GetById(int id)
        {
            var service = await _serviceService.GetServiceByIdAsync(id);
            if (service == null)
            {
                return NotFound();
            }
            return Ok(service);
        }

        [HttpPost]
        public async Task<ActionResult<Service>> Create(Service service)
        {
            var createdService = await _serviceService.CreateServiceAsync(service);
            return CreatedAtAction(nameof(GetById), new { id = createdService.Id }, createdService);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Service service)
        {
            if (id != service.Id)
            {
                return BadRequest();
            }

            await _serviceService.UpdateServiceAsync(service);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _serviceService.DeleteServiceAsync(id);
            return NoContent();
        }
}
