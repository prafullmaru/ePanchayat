using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ePanchayat.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementRepository announcementRepository;

        public AnnouncementController(IAnnouncementRepository announcementRepository)
        {
            this.announcementRepository = announcementRepository;
        }

        [HttpGet("")]
        public IEnumerable<Announcement> Get()
        {
            return announcementRepository.GetAll();
        }

        [HttpGet("{announcementId}")]
        public Announcement GetById(int announcementId)
        {
            return announcementRepository.GetById(announcementId);
        }        
    }
}
