using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ePanchayat.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            this.eventRepository = eventRepository;
        }

        [HttpGet("")]
        public IEnumerable<Event> Get()
        {
            return eventRepository.GetAll();
        }

        [HttpGet("{eventId}")]
        public Event GetById(int eventId)
        {
            return eventRepository.GetById(eventId);
        }        
    }
}
