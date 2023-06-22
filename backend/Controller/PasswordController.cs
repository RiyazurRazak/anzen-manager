using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
    [Route("api/v1")]
    [ApiController]
    public class PasswordController : ControllerBase
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger _logger;
       public PasswordController(ApplicationDbContext dbContext, ILogger<PasswordController> logger) 
       {

            _dbContext = dbContext;
            _logger = logger;
       }

        [HttpGet("passwords/{identifier}")]
        public IActionResult GetAllPasswords(string identifier)
        {
            try
            {
                var passwords = _dbContext.Passwords.Where(password => password.DeviceId == identifier).Select(password => new {password.Cypher, password.Label});
                _logger.LogInformation($"Return Cyphers of the device {identifier}");
                return Ok(passwords);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("password}")]
        public IActionResult AddPassword([FromBody] AddPasswordDto payload)
        {
            try
            {
                Passwords password = new()
                {
                    Id = Guid.NewGuid().ToString(),
                    DeviceId = payload.DeviceId,
                    Label = payload.Label,
                    Cypher = payload.Cypher,
                };
                _dbContext.Passwords.Add(password);
                _dbContext.SaveChanges();
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
