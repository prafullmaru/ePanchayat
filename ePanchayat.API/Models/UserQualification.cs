using ePanchayat.API.Models;

namespace ePanchayat.API.Models
{
    public class UserQualification
    {
        public int QualificationId { get; set; }
        public int UserId { get; set; }
        public string UserFullName { get; set; }
        public string Qualification { get; set; }
        public string Major { get; set; }
        public int PassingYear { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public int LastModifiedBy { get; set; }
        public string LastModifiedByFullName { get; set; }
        public bool IsActive { get; set; }
    }
}