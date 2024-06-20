using ePanchayat.API.Models;

namespace ePanchayat.API.Models
{
    public class Event
    {
        public int EventId { get; set; }
        public string EventTitle { get; set; }
        public string Description { get; set; }
        public DateTime EventDate { get; set; }
        public DateTime EventTimeFrom { get; set; }
        public DateTime EventTimeTo { get; set; }
        public int EventHostId { get; set; }
        public string EventHostFullName { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public int LastModifiedBy { get; set; }
        public string LastModifiedByFullName { get; set; }
        public bool IsActive { get; set; }
    }
}