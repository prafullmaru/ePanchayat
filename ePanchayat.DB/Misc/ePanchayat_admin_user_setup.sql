USE [master]
CREATE LOGIN admin WITH PASSWORD = 'Admin@2024#'
GO

USE [ePanchayat]
GO

CREATE USER admin FOR LOGIN admin;
GO 

USE [ePanchayat]
GO

ALTER ROLE [db_owner] ADD MEMBER [admin]
GO