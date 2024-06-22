using ePanchayat.API.Models;

namespace ePanchayat.API.Interfaces
{
    public interface IUserRoleRepository
    {
        List<UserRole> GetAll();
        
        UserRole GetById(int userRoleId);

        bool Save(UserRole userRole);

        bool Remove(UserRole userRole);
    }
}
