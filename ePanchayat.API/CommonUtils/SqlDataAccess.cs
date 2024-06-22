using ePanchayat.API.Interfaces;
using System.Data;
using System.Data.SqlClient;

namespace ePanchayat.API.CommonUtils
{
    public class SqlDataAccess : ISqlDataAccess
    {
        public DataSet GetDataSetByStoredProc(string procName)
        {
            var dataset = ExecuteDataset(Constants.ConnectionString,
                CommandType.StoredProcedure,
                procName,
                Array.Empty<SqlParameter>()
                );

            return dataset;
        }

        public DataSet GetDataSetByStoredProc(string procName, Dictionary<string, object> parameters)
        {
            var dataset = ExecuteDataset(Constants.ConnectionString,
                CommandType.StoredProcedure,
                procName,
                parameters != null ? parameters.Select(kvp => new SqlParameter(kvp.Key, kvp.Value)).ToArray() : Array.Empty<SqlParameter>()
                );

            return dataset;
        }

        private DataSet ExecuteDataset(string connectionString, CommandType commandType, string commandText, params SqlParameter[] parameters)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                conn.Open();
                var sqlCommand = new SqlCommand();
                ConfigureCommand(sqlCommand, conn, commandType, commandText, parameters);
                var adapter = new SqlDataAdapter(sqlCommand);
                var ds = new DataSet();
                adapter.Fill(ds);
                return ds;
            }
        }

        private void ConfigureCommand(SqlCommand sqlCommand, SqlConnection sqlConnection, CommandType commandType, string commandText, SqlParameter[] sqlParameters)
        {
            if (sqlConnection.State != ConnectionState.Open)
            {
                sqlConnection.Open();
            }
            sqlCommand.Connection = sqlConnection;
            sqlCommand.CommandTimeout = sqlCommand.Connection.ConnectionTimeout;
            sqlCommand.CommandText = commandText;
            sqlCommand.CommandType = commandType;

            if (sqlParameters != null)
            {
                AddParams(sqlCommand, sqlParameters);
            }
        }

        private void AddParams(SqlCommand sqlCommand, SqlParameter[] sqlParameters)
        {
            foreach (var param in sqlParameters)
            {
                if (param.Direction == ParameterDirection.InputOutput && param.Value == null)
                {
                    param.Value = DBNull.Value;
                }
                sqlCommand.Parameters.Add(param);
            }
        }
    }
}
