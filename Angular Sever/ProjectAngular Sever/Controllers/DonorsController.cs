using Microsoft.AspNetCore.Mvc;
using Service;
using Entites;
using System.Drawing;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectAngular_Sever.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorsController : ControllerBase
    {
        DonorService service=new DonorService();
        // GET: api/<DonorsController>
        [HttpGet]
        public IEnumerable<Donor> Get()
        {
            return service.Get();
        }

        // GET api/<DonorsController>/5
        [HttpGet("{id}")]
        public Donor Get(int id)
        {
            return service.Get(id);
        }

        // POST api/<DonorsController>
        [HttpPost]
        public Donor Post([FromBody] Donor donor)
        {
            return service.Post(donor);
        }

        // PUT api/<DonorsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Donor donor)
        {
            service.Put(id,donor);
        }

        // DELETE api/<DonorsController>/5
        [HttpDelete("{id}")]
        public void Delete(int? id)
        {
            service.Delete(id);
        }
    }
}
