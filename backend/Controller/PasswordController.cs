using backend.Data;
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

    }
}
