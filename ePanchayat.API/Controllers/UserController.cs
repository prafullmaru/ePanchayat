using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ePanchayat.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;

        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpGet("")]
        public IEnumerable<User> Get()
        {
            return userRepository.GetAll();
        }

        [HttpGet("{userId}")]
        public User GetById(int userId)
        {
            return userRepository.GetById(userId);
        }        
    }
}
