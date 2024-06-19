using ePanchayat.API.Models;

namespace ePanchayat.API.Interfaces
{
    public interface IPanchayatRepository
    {
        List<Panchayat> GetAll();
    }
}
