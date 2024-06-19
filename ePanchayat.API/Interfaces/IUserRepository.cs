using ePanchayat.API.Models;

namespace ePanchayat.API.Interfaces
{
    public interface IUserRepository
    {
        List<User> GetAll();
        
        User GetById(int userId);

        bool Save(User user);

        bool Remove(User user);
    }
}
