using backend.Data;
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

   
    }
}
