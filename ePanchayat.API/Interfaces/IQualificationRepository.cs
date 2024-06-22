using ePanchayat.API.Models;

namespace ePanchayat.API.Interfaces
{
    public interface IQualificationRepository
    {
        List<UserQualification> GetAll();

        UserQualification GetById(int userQualificationId);

        bool Save(UserQualification userQualification);

        bool Remove(UserQualification userQualification);
    }
}
