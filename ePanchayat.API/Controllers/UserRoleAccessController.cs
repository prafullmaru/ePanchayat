using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ePanchayat.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserRoleAccessController : ControllerBase
    {
        private readonly IUserRoleAccessRepository userRoleAccessRepository;

        public UserRoleAccessController(IUserRoleAccessRepository userRoleAccessRepository)
        {
            this.userRoleAccessRepository = userRoleAccessRepository;
        }

        [HttpGet("")]
        public IEnumerable<UserRoleAccess> Get()
        {
            return userRoleAccessRepository.GetAll();
        }

        [HttpGet("{userRoleAccessId}")]
        public UserRoleAccess GetById(int userRoleAccessId)
        {
            return userRoleAccessRepository.GetById(userRoleAccessId);
        }        
    }
}
