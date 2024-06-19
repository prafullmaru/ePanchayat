using ePanchayat.API.Interfaces;
using ePanchayat.API.Models;
using System.Data;

namespace ePanchayat.API.Repository
{
    public class QualificationRepository : IQualificationRepository
    {
        private readonly ISqlDataAccess _sqlDataAccess;

        public QualificationRepository(ISqlDataAccess sqlDataAccess)
        {
            _sqlDataAccess = sqlDataAccess;
        }

        public List<UserQualification> GetAll()
        {
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("QualificationGet_sp");
            return Map(dataset);
        }

        public UserQualification GetById(int qualificationId)
        {
            var parameters = new Dictionary<string, object>
            {
                { "@QualificationId", qualificationId }
            };
            var dataset = _sqlDataAccess.GetDataSetByStoredProc("QualificationGet_sp", parameters);

            return Map(dataset).First();
        }

        public bool Remove(UserQualification UserQualification)
        {
            throw new NotImplementedException();
        }

        public bool Save(UserQualification UserQualification)
        {
            throw new NotImplementedException();
        }

        private List<UserQualification> Map(DataSet dataset)
        {
            if(dataset.Tables.Count == 0 || dataset.Tables[0].Rows.Count == 0)
            {
                return new List<UserQualification>();
            }

            var UserQualifications = dataset.Tables[0].AsEnumerable().Select(row => new UserQualification()
            {
                QualificationId = Convert.ToInt32(row["QualificationId"]),
                UserId = Convert.ToInt32(row["UserId"]),
                Qualification = Convert.ToString(row["Qualification"]),
                Major = Convert.ToString(row["Major"]),
                PassingYear = Convert.ToInt32(row["PassingYear"]),
                LastModifiedOn = Convert.ToDateTime(row["LastModifiedOn"]),
                LastModifiedBy = Convert.ToString(row["LastModifiedBy"]),
                IsActive = Convert.ToBoolean(row["IsActive"])
            }).ToList();

            return UserQualifications;
        }
    }
}