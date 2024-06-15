using System.Data;

namespace ePanchayat.API.Interfaces
{
    public interface ISqlDataAccess
    {
        DataSet GetDataSetByStoredProc(string procName);

        DataSet GetDataSetByStoredProc(string procName, Dictionary<string, object> parameters);
    }
}
