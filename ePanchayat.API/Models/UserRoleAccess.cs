using ePanchayat.API.Models;

namespace ePanchayat.API.Models
{
    public class UserRoleAccess
    {
        public int UserRoleAccessId { get; set; }
        public int UserId { get; set; }
        public int UserRoleId { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public string LastModifiedBy { get; set; }
        public bool IsActive { get; set; }
    }
}