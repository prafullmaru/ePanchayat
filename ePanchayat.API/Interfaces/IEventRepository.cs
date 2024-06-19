using ePanchayat.API.Models;

namespace ePanchayat.API.Interfaces
{
    public interface IEventRepository
    {
        List<Event> GetAll();

        Event GetById(int EventId);

        bool Save(Event Event);

        bool Remove(Event Event);
    }
}
