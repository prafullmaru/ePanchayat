using ePanchayat.API.Models;

namespace ePanchayat.API.Models
{
    public class Vehicle
    {
        public int VehicleId { get; set; }
        public string Category { get; set; }
        public string RegistrationNumber { get; set; }
        public int OwnerId { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public string LastModifiedBy { get; set; }
        public bool IsActive { get; set; }
    }
}