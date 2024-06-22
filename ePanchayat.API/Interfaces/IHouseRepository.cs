using ePanchayat.API.Models;

namespace ePanchayat.API.Interfaces
{
    public interface IHouseRepository
    {
        List<House> GetAll();

        House GetById(int houseId);

        bool Save(House house);

        bool Remove(House house);
    }
}
