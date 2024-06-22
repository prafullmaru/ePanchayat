using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ePanchayat.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {
        private readonly IUserRoleRepository userRoleRepository;

        public UserRoleController(IUserRoleRepository userRoleRepository)
        {
            this.userRoleRepository = userRoleRepository;
        }

        [HttpGet("")]
        public IEnumerable<UserRole> Get()
        {
            return userRoleRepository.GetAll();
        }

        [HttpGet("{userRoleId}")]
        public UserRole GetById(int userRoleId)
        {
            return userRoleRepository.GetById(userRoleId);
        }        
    }
}
