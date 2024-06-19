using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using System.Data;

namespace ePanchayat.API.Repository
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public AnnouncementRepository(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public List<Announcement> GetAll()
        {
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("AnnouncementGet_sp");
            return Map(dataset);
        }

        public Announcement GetById(int AnnouncementId)
        {
            var parameters = new Dictionary<string, object>
            {
                { "@AnnouncementId", AnnouncementId }
            };
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("AnnouncementGet_sp", parameters);

            return Map(dataset).First();
        }

        public bool Remove(Announcement Announcement)
        {
            throw new NotImplementedException();
        }

        public bool Save(Announcement Announcement)
        {
            throw new NotImplementedException();
        }

        private List<Announcement> Map(DataSet dataset)
        {
            if(dataset.Tables.Count == 0 || dataset.Tables[0].Rows.Count == 0)
            {
                return new List<Announcement>();
            }

            var Announcements = dataset.Tables[0].AsEnumerable().Select(row => new Announcement()
            {
                AnnouncementId = Convert.ToInt32(row["AnnouncementId"]),
                AnnouncementTitle = Convert.ToString(row["AnnouncementTitle"]),
                Description = Convert.ToString(row["Description"]),
                DisplayTill = Convert.ToDateTime(row["DisplayTill"]),
                LastModifiedOn = Convert.ToDateTime(row["LastModifiedOn"]),
                LastModifiedBy = Convert.ToString(row["LastModifiedBy"]),
                IsActive = Convert.ToBoolean(row["IsActive"])
            }).ToList();

            return Announcements;
        }
    }
}