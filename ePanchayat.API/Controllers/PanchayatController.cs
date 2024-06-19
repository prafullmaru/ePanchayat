using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ePanchayat.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PanchayatController : ControllerBase
    {
        private readonly IPanchayatRepository panchayatRepository;

        public PanchayatController(IPanchayatRepository panchayatRepository)
        {
            this.panchayatRepository = panchayatRepository;
        }

        [HttpGet("")]
        public IEnumerable<Panchayat> Get()
        {
            var panchayats = panchayatRepository.GetAll();
            return panchayats;
        }
    }
}
