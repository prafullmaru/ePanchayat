using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ePanchayat.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HouseController : ControllerBase
    {
        private readonly IHouseRepository houseRepository;

        public HouseController(IHouseRepository houseRepository)
        {
            this.houseRepository = houseRepository;
        }

        [HttpGet("")]
        public IEnumerable<House> Get()
        {
            return houseRepository.GetAll();
        }

        [HttpGet("{houseId}")]
        public House GetById(int houseId)
        {
            return houseRepository.GetById(houseId);
        }        
    }
}
