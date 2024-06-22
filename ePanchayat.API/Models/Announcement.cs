using ePanchayat.API.Models;

namespace ePanchayat.API.Models
{
    public class Announcement
    {
        public int AnnouncementId { get; set; }
        public string AnnouncementTitle { get; set; }
        public string Description { get; set; }
        public DateTime DisplayTill { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public int LastModifiedBy { get; set; }
        public string LastModifiedByFullName { get; set; }
        public bool IsActive { get; set; }
    }
}