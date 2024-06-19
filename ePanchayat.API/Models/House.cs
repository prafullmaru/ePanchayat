using ePanchayat.API.Models;

namespace ePanchayat.API.Models
{
    public class House
    {
        public int HouseId { get; set; }
        public string HouseNumber { get; set; }
        public int OwnerId { get; set; }
        public string Landmark { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public string LastModifiedBy { get; set; }
        public bool IsActive { get; set; }
    }
}