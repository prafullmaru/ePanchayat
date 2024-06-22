using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using System.Data;

namespace ePanchayat.API.Repository
{
    public class UserRoleAccessRepository : IUserRoleAccessRepository
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public UserRoleAccessRepository(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public List<UserRoleAccess> GetAll()
        {
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("UserRoleAccessGet_sp");
            return Map(dataset);
        }

        public UserRoleAccess GetById(int userRoleAccessId)
        {
            var parameters = new Dictionary<string, object>
            {
                { "@UserRoleAccessId", userRoleAccessId }
            };
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("UserRoleAccessGet_sp", parameters);

            return Map(dataset).First();
        }

        public bool Remove(UserRoleAccess userAccessRole)
        {
            throw new NotImplementedException();
        }

        public bool Save(UserRoleAccess userAccessRole)
        {
            throw new NotImplementedException();
        }

        private List<UserRoleAccess> Map(DataSet dataset)
        {
            if(dataset.Tables.Count == 0 || dataset.Tables[0].Rows.Count == 0)
            {
                return new List<UserRoleAccess>();
            }

            var userAccessRoles = dataset.Tables[0].AsEnumerable().Select(row => new UserRoleAccess()
            {
                UserRoleAccessId = Convert.ToInt32(row["UserRoleAccessId"]),
                UserId = Convert.ToInt32(row["UserId"]),
                UserFullName = Convert.ToString(row["UserFullName"]),
                UserRoleId = Convert.ToInt32(row["UserRoleId"]),
                UserRoleName = Convert.ToString(row["UserRoleName"]),
                LastModifiedOn = Convert.ToDateTime(row["LastModifiedOn"]),
                LastModifiedBy = Convert.ToInt32(row["LastModifiedBy"]),
                LastModifiedByFullName = Convert.ToString(row["LastModifiedByFullName"]),
                IsActive = Convert.ToBoolean(row["IsActive"])
            }).ToList();

            return userAccessRoles;
        }
    }
}