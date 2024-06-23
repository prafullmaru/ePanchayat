namespace ePanchayat.API.Models
{
    public class Panchayat
    {
        public int PanchayatId { get; set; }
        public string PanchayatName { get; set; }
        public DateTime LastModifiedOn { get; set; }
        public int LastModifiedBy { get; set; }
        public string LastModifiedByFullName { get; set; }
        public bool IsActive { get; set; }
    }
}
