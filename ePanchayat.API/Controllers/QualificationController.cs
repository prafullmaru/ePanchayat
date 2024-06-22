using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ePanchayat.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QualificationController : ControllerBase
    {
        private readonly IQualificationRepository qualificationRepository;

        public QualificationController(IQualificationRepository qualificationRepository)
        {
            this.qualificationRepository = qualificationRepository;
        }

        [HttpGet("")]
        public IEnumerable<UserQualification> Get()
        {
            return qualificationRepository.GetAll();
        }

        [HttpGet("{qualificationId}")]
        public UserQualification GetById(int qualificationId)
        {
            return qualificationRepository.GetById(qualificationId);
        }        
    }
}
