using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/v1")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger _logger;


        public DevicesController(ApplicationDbContext dbContext, ILogger<DevicesController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        [HttpPost("device")]
        public IActionResult AddDevice([FromBody] AddDeviceDto payload)
        {
            try
            {
                Devices device = new()
                {
                    Identifier = payload.Identifier,
                    Model = payload.Model
                };
                _dbContext.Devices.Add(device);
                _dbContext.SaveChanges();
                _logger.LogInformation("New Device added");
                return Ok();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return StatusCode(500, ex.Message);
            }
          
        }

        [HttpDelete("device/{identifier}")]
        public IActionResult DeleteDevice(string identifier)
        {
            try
            {
                var device = _dbContext.Devices.Find(identifier);
                if(device == null)
                {
                    _logger.LogInformation("Device Identifier not found in records");
                    return NotFound();
                }
                _dbContext.Devices.Remove(device);
                _dbContext.SaveChanges();
                _logger.LogInformation("Device successfully deleted");
                return Ok();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }
    }
}
