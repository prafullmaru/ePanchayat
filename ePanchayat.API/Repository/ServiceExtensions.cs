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
            collection.AddScoped<IUserRepository, UserRepository>();
            collection.AddScoped<IUserRoleRepository, UserRoleRepository>();
            collection.AddScoped<IUserRoleAccessRepository, UserRoleAccessRepository>();
            collection.AddScoped<IVehicleRepository, VehicleRepository>();
            collection.AddScoped<IQualificationRepository, QualificationRepository>();
            collection.AddScoped<IHouseRepository, HouseRepository>();
        }
    }
}
