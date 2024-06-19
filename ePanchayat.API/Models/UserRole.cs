namespace ePanchayat.API.Models
{
    public class UserRole
    {
        public int UserRoleId { get; set; }
        public string UserRoleName { get; set; }
        public string Description { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public string LastModifiedBy { get; set; }
        public bool IsActive { get; set; }
    }
}