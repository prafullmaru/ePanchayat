using ePanchayat.API.CommonUtils;
using ePanchayat.API.Interfaces;

namespace ePanchayat.API.Repository
{
    public static class ServiceExtensions
    {
        public static void RegisterRepos(this IServiceCollection collection)
        {
            collection.AddSingleton<ISqlDataAccess, SqlDataAccess>();
            collection.AddScoped<IPanchayatRepository, PanchayatRepository>();
            //Add other repositories
        }
    }
}
