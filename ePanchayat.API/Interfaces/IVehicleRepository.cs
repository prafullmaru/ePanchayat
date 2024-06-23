using ePanchayat.API.Models;

namespace ePanchayat.API.Interfaces
{
    public interface IVehicleRepository
    {
        List<Vehicle> GetAll();

        Vehicle GetById(int vehicleId);

        bool Save(Vehicle vehicle);

        bool Remove(Vehicle vehicle);
    }
}
