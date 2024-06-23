using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using System.Data;

namespace ePanchayat.API.Repository
{
    public class UserRoleRepository : IUserRoleRepository
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public UserRoleRepository(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public List<UserRole> GetAll()
        {
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("UserRoleGet_sp");
            return Map(dataset);
        }

        public UserRole GetById(int userRoleId)
        {
            var parameters = new Dictionary<string, object>
            {
                { "@UserRoleId", userRoleId }
            };
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("UserRoleGet_sp", parameters);

            return Map(dataset).First();
        }

        public bool Remove(UserRole userRole)
        {
            throw new NotImplementedException();
        }

        public bool Save(UserRole userRole)
        {
            throw new NotImplementedException();
        }

        private List<UserRole> Map(DataSet dataset)
        {
            if(dataset.Tables.Count == 0 || dataset.Tables[0].Rows.Count == 0)
            {
                return new List<UserRole>();
            }

            var userRoles = dataset.Tables[0].AsEnumerable().Select(row => new UserRole()
            {
                UserRoleId = Convert.ToInt32(row["UserRoleId"]),
                UserRoleName = Convert.ToString(row["UserRoleName"]),
                Description = Convert.ToString(row["Description"]),
                LastModifiedOn = Convert.ToDateTime(row["LastModifiedOn"]),
                LastModifiedBy = Convert.ToInt32(row["LastModifiedBy"]),
                LastModifiedByFullName = Convert.ToString(row["LastModifiedByFullName"]),
                IsActive = Convert.ToBoolean(row["IsActive"])
            }).ToList();

            return userRoles;
        }
    }
}