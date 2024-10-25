—Logins

use master

go

Print 'Start create user ePanchayatAdmin ON Server:'+ @@servername + and Database: '+db_name()

IF NOT EXISTS (SELECT * FROM dbo.syslogins WHERE loginname = N'ePanchayatAdmin')

BEGIN

	CREATE LOGIN [ePanchayatAdmin] FROM WINDOWS WITH DEFAULT DATABASE=[master]

END

Print 'End create user ePanchayatAdmin ON Server:'+ @@servername + and Database: '+db_name ()

GO

--Admin Role

USE [ePanchayat]

GO

Print 'Start create user ePanchayatAdmin ON Server: '+ @@servername + and Database: "+db_name()

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = N'ePanchayatAdmin")

BEGIN

   CREATE USER [ePanchayatAdmin] FOR LOGIN [ePanchayatAdmin]

END

Print 'Start Add role db datareader, db datawriter, db ddladmin' 

EXEC sp_addrolemember N'db_datareader',N'ePanchayatAdmin
EXEC sp_addrolemember N'db datawriter', N'ePanchayatAdmin'
EXEC sp_addrolemember N'db_ddladmin', N'ePanchayatAdmin'

Print 'End Add role db_reader, db writer, db_ddladmin'