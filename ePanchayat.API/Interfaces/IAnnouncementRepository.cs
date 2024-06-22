using ePanchayat.API.Models;

namespace ePanchayat.API.Interfaces
{
    public interface IAnnouncementRepository
    {
        List<Announcement> GetAll();

        Announcement GetById(int AnnouncementId);

        bool Save(Announcement Announcement);

        bool Remove(Announcement Announcement);
    }
}
