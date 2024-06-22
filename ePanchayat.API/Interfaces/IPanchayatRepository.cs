using ePanchayat.API.Models;

namespace ePanchayat.API.Interfaces
{
    public interface IPanchayatRepository
    {
        List<Panchayat> GetAll();

        Panchayat GetById(int panchayatId);

        bool Save(Panchayat panchayat);

        bool Remove(Panchayat panchayat);
    }
}