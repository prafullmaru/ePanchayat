 --Logins

use master

go

Print 'Start create user ePanchayatDeveloper_R_W ON Server:'+ @@servername + and Database: '+db_name()

IF NOT EXISTS (SELECT * FROM dbo.syslogins WHERE loginname = N'ePanchayatDeveloper_R_W')

BEGIN

	CREATE LOGIN [ePanchayatDeveloper_R_W] FROM WINDOWS WITH DEFAULT DATABASE=[master]

END

Print 'End create user ePanchayatDeveloper_R_W ON Server:'+ @@servername + and Database: '+db_name ()

GO

--Admin Role

USE [ePanchayat]

GO

Print 'Start create user ePanchayatDeveloper_R_W ON Server: '+ @@servername + and Database: "+db_name()

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = N'ePanchayatDeveloper_R_W")

BEGIN

   CREATE USER [ePanchayatDeveloper_R_W] FOR LOGIN [ePanchayatDeveloper_R_W]

END

Print 'Start Add role db datareader, db datawriter'

EXEC sp_addrolemember N'db_datareader',N'ePanchayatDeveloper_R_W
EXEC sp_addrolemember N'db datawriter', N'ePanchayatDeveloper_R_W'

Print 'End Add role db_reader, db writer'