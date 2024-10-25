--Logins

use master

go

Print 'Start create user ePanchayatDeveloper_Read_only ON Server:'+ @@servername + and Database: '+db_name()

IF NOT EXISTS (SELECT * FROM dbo.syslogins WHERE loginname = N'ePanchayatDeveloper_Read_Only')

BEGIN

	CREATE LOGIN [ePanchayatDeveloper_Read_Only] FROM WINDOWS WITH DEFAULT DATABASE=[master]

END

Print 'End create user ePanchayatDeveloper_Read_Only ON Server:'+ @@servername + and Database: '+db_name ()

GO

--Admin Role

USE [ePanchayat]

GO

Print 'Start create user ePanchayatDeveloper_Read_Only ON Server: '+ @@servername + and Database: "+db_name()

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = N'ePanchayatDeveloper_Read_Only")

BEGIN

   CREATE USER [ePanchayatDeveloper_Read_Only] FOR LOGIN [ePanchayatDeveloper_Read_Only]

END

Print 'Start Add role db datareader'

EXEC sp_addrolemember N'db_datareader',N'ePanchayatDeveloper_Read_Only

Print 'End Add role db_reader’’