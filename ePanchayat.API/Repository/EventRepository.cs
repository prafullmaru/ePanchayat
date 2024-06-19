using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using System.Data;

namespace ePanchayat.API.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public EventRepository(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public List<Event> GetAll()
        {
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("EventGet_sp");
            return Map(dataset);
        }

        public Event GetById(int EventId)
        {
            var parameters = new Dictionary<string, object>
            {
                { "@EventId", EventId }
            };
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("EventGet_sp", parameters);

            return Map(dataset).First();
        }

        public bool Remove(Event Event)
        {
            throw new NotImplementedException();
        }

        public bool Save(Event Event)
        {
            throw new NotImplementedException();
        }

        private List<Event> Map(DataSet dataset)
        {
            if(dataset.Tables.Count == 0 || dataset.Tables[0].Rows.Count == 0)
            {
                return new List<Event>();
            }

            var Events = dataset.Tables[0].AsEnumerable().Select(row => new Event()
            {
                EventId = Convert.ToInt32(row["EventId"]),
                EventTitle = Convert.ToString(row["EventTitle"]),
                Description = Convert.ToString(row["Description"]),
                EventDate = Convert.ToDateTime(row["EventDate"]),
                EventTimeFrom = Convert.ToDateTime(row["EventTimeFrom"]),
                EventTimeTo = Convert.ToDateTime(row["EventTimeTo"]),
                EventHostId = Convert.ToInt32(row["EventHostId"]),
                LastModifiedOn = Convert.ToDateTime(row["LastModifiedOn"]),
                LastModifiedBy = Convert.ToString(row["LastModifiedBy"]),
                IsActive = Convert.ToBoolean(row["IsActive"])
            }).ToList();

            return Events;
        }
    }
}