using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ePanchayat.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleRepository vehicleRepository;

        public VehicleController(IVehicleRepository vehicleRepository)
        {
            this.vehicleRepository = vehicleRepository;
        }

        [HttpGet("")]
        public IEnumerable<Vehicle> Get()
        {
            return vehicleRepository.GetAll();
        }

        [HttpGet("{vehicleId}")]
        public Vehicle GetById(int vehicleId)
        {
            return vehicleRepository.GetById(vehicleId);
        }        
    }
}
