using ePanchayat.API.Models;

namespace ePanchayat.API.Interfaces
{
    public interface IHouseRepository
    {
        List<House> GetAll();

        House GetById(int HouseId);

        bool Save(House House);

        bool Remove(House House);
    }
}
