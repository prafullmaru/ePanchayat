using ePanchayat.API.Models;

namespace ePanchayat.API.Models
{
    public class UserRoleAccess
    {
        public int UserRoleAccessId { get; set; }
        public int UserId { get; set; }
        public string UserFullName { get; set; }
        public int UserRoleId { get; set; }
        public string UserRoleName { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public int LastModifiedBy { get; set; }
        public string LastModifiedByFullName { get; set; }
        public bool IsActive { get; set; }
    }
}