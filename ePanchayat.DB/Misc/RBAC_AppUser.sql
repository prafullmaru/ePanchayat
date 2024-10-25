--Logins

use master

go

Print 'Start create user ePanchayatAppUser ON Server:'+ @@servername + and Database: '+db_name()

IF NOT EXISTS (SELECT * FROM dbo.syslogins WHERE loginname = N'ePanchayatAppUser')

BEGIN

	CREATE LOGIN [ePanchayatAppUser] FROM WINDOWS WITH DEFAULT DATABASE=[master]

END

Print 'End create user ePanchayatAppUser ON Server:'+ @@servername + and Database: '+db_name ()

GO

--Admin Role

USE [ePanchayat]

GO

Print 'Start create user ePanchayatAppUser ON Server: '+ @@servername + and Database: "+db_name()

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = N'ePanchayatAppUser")

BEGIN

   CREATE USER [ePanchayatAppUser] FOR LOGIN [ePanchayatAppUser]

END

Print 'Start Add role db datareader, db datawriter' 

EXEC sp_addrolemember N'db_datareader',N'ePanchayatAppUser
EXEC sp_addrolemember N'db datawriter', N'ePanchayatAppUser'

Print 'End Add role db_reader, db writer’