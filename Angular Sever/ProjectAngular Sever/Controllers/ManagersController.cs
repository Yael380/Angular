using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectAngular_Sever.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagersController : ControllerBase
    {
        string _password = "12345";
        // POST: api/<ManagersController>
        [HttpPost]
        public bool Post([FromQuery] string password)
        {
            return (password == _password);
        }

    }
}
