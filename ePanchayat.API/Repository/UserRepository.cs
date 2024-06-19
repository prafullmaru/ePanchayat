using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using System.Data;

namespace ePanchayat.API.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public UserRepository(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public List<User> GetAll()
        {
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("UsersGet_sp");
            return Map(dataset);
        }

        public User GetById(int userId)
        {
            var parameters = new Dictionary<string, object>
            {
                { "@UserId", userId }
            };
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("UsersGet_sp", parameters);

            return Map(dataset).First();
        }

        public bool Remove(User user)
        {
            throw new NotImplementedException();
        }

        public bool Save(User user)
        {
            throw new NotImplementedException();
        }

        private List<User> Map(DataSet dataset)
        {
            if(dataset.Tables.Count == 0 || dataset.Tables[0].Rows.Count == 0)
            {
                return new List<User>();
            }

            var users = dataset.Tables[0].AsEnumerable().Select(row => new User()
            {
                UserId = Convert.ToInt32(row["UserId"]),
                UserLogin = Convert.ToString(row["UserLogin"]),
                FirstName = Convert.ToString(row["FirstName"]),
                LastName = Convert.ToString(row["LastName"]),
                MobileNo = Convert.ToString(row["MobileNo"]),
                Email = Convert.ToString(row["Email"]),
                ProfilePhoto = Convert.FromBase64String(Convert.ToString(row["ProfilePhoto"])),
                Address = Convert.ToString(row["Address"]),
                LastModifiedOn = Convert.ToDateTime(row["LastModifiedOn"]),
                LastModifiedBy = Convert.ToString(row["LastModifiedBy"]),
                IsActive = Convert.ToBoolean(row["IsActive"])
            }).ToList();

            return users;
        }
    }
}