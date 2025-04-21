using Entites;
using Microsoft.AspNetCore.Mvc;
using Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectAngular_Sever.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class GiftsController : ControllerBase
    {
         GiftService service;
        public GiftsController()
        {
            this.service = new GiftService();
        }

        // GET: api/<GiftsController>
        [HttpGet]
        public IEnumerable<Gift> Get()
        {
            return service.Get();
        }

        // GET api/<GiftsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<GiftsController>
        [HttpPost]
        public ActionResult<Gift> Post([FromBody] Gift gift)
        {
           Gift newGift = service.Post(gift);
            if (newGift != null) {
                return CreatedAtAction(nameof(Get), new { id = newGift.Id }, newGift);
            }
            else
                return null;
        }

        // PUT api/<GiftsController>/5
        [HttpPut("{id}")]
        public void Put([FromQuery]int id, [FromBody] Gift gift)
        {
            service.Put(id,gift);
        }

        // DELETE api/<GiftsController>/5
        [HttpDelete("{id}")]
        public void Delete([FromQuery] int id)
        {
            service.Delete(id);
        }
        // POST api/<GiftsController>/
        [HttpPost("deleteProducts")]
        public List<Gift> Post2([FromBody] Gift[] arrGift)
        {
            return service.Post2(arrGift);
        }
        // PUT api/<GiftsController>/5
        [HttpPut]
        [Route("cart")]
        public void Cart([FromBody] List<GiftCart> arr, [FromQuery] User user)
        {
            service.Cart(arr, user);
        }
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var filePath = file.FileName;
            //var filePath = Path.Combine("wwwroot", file.FileName);


            // יצירת תיקייה במידה ואין כזאת
            if (!Directory.Exists("wwwroot"))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
            }
            using (var stream = new FileStream(Path.Combine("wwwroot", file.FileName), FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { FilePath = filePath });
        }
    
}
}
