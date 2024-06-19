using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using System.Data;

namespace ePanchayat.API.Repository
{
    public class HouseRepository : IHouseRepository
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public HouseRepository(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public List<House> GetAll()
        {
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("HouseGet_sp");
            return Map(dataset);
        }

        public House GetById(int HouseId)
        {
            var parameters = new Dictionary<string, object>
            {
                { "@HouseId", HouseId }
            };
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("HouseGet_sp", parameters);

            return Map(dataset).First();
        }

        public bool Remove(House House)
        {
            throw new NotImplementedException();
        }

        public bool Save(House House)
        {
            throw new NotImplementedException();
        }

        private List<House> Map(DataSet dataset)
        {
            if(dataset.Tables.Count == 0 || dataset.Tables[0].Rows.Count == 0)
            {
                return new List<House>();
            }

            var Houses = dataset.Tables[0].AsEnumerable().Select(row => new House()
            {
                HouseId = Convert.ToInt32(row["HouseId"]),
                HouseNumber = Convert.ToString(row["HouseNumber"]),
                OwnerId = Convert.ToInt32(row["OwnerId"]),
                Landmark = Convert.ToString(row["Landmark"]),
                LastModifiedOn = Convert.ToDateTime(row["LastModifiedOn"]),
                LastModifiedBy = Convert.ToString(row["LastModifiedBy"]),
                IsActive = Convert.ToBoolean(row["IsActive"])
            }).ToList();

            return Houses;
        }
    }
}