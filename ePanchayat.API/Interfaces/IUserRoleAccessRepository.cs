using ePanchayat.API.Models;

namespace ePanchayat.API.Interfaces
{
    public interface IUserRoleAccessRepository
    {
        List<UserRoleAccess> GetAll();

        UserRoleAccess GetById(int userRoleAccessId);

        bool Save(UserRoleAccess userRoleAccess);

        bool Remove(UserRoleAccess userRoleAccess);
    }
}
