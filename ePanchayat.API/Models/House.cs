using ePanchayat.API.Models;

namespace ePanchayat.API.Models
{
    public class House
    {
        public int HouseId { get; set; }
        public string HouseNumber { get; set; }
        public int OwnerId { get; set; }
        public string OwnerFullName { get; set; }
        public string Landmark { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public int LastModifiedBy { get; set; }
        public string LastModifiedByFullName { get; set; }
        public bool IsActive { get; set; }
    }
}