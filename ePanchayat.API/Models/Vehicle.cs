using ePanchayat.API.Models;

namespace ePanchayat.API.Models
{
    public class Vehicle
    {
        public int VehicleId { get; set; }
        public string Category { get; set; }
        public string RegistrationNumber { get; set; }
        public int OwnerId { get; set; }
        public string OwnerFullName { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public int LastModifiedBy { get; set; }
        public string LastModifiedByFullName { get; set; }
        public bool IsActive { get; set; }
    }
}