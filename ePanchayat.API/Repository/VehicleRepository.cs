using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using System.Data;

namespace ePanchayat.API.Repository
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public VehicleRepository(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public List<Vehicle> GetAll()
        {
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("VehicleGet_sp");
            return Map(dataset);
        }

        public Vehicle GetById(int vehicleId)
        {
            var parameters = new Dictionary<string, object>
            {
                { "@VehicleId", vehicleId }
            };
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("VehicleGet_sp", parameters);

            return Map(dataset).First();
        }

        public bool Remove(Vehicle vehicle)
        {
            throw new NotImplementedException();
        }

        public bool Save(Vehicle vehicle)
        {
            throw new NotImplementedException();
        }

        private List<Vehicle> Map(DataSet dataset)
        {
            if(dataset.Tables.Count == 0 || dataset.Tables[0].Rows.Count == 0)
            {
                return new List<Vehicle>();
            }

            var vehicles = dataset.Tables[0].AsEnumerable().Select(row => new Vehicle()
            {
                VehicleId = Convert.ToInt32(row["VehicleId"]),
                Category = Convert.ToString(row["Category"]),
                RegistrationNumber = Convert.ToString(row["RegistrationNumber"]),
                OwnerId = Convert.ToInt32(row["OwnerId"]),
                OwnerFullName = Convert.ToString(row["OwnerFullName"]),
                LastModifiedOn = Convert.ToDateTime(row["LastModifiedOn"]),
                LastModifiedBy = Convert.ToInt32(row["LastModifiedBy"]),
                LastModifiedByFullName = Convert.ToString(row["LastModifiedByFullName"]),
                IsActive = Convert.ToBoolean(row["IsActive"])
            }).ToList();

            return vehicles;
        }
    }
}