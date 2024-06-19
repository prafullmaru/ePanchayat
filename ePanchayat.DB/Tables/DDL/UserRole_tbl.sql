USE [ePanchayat]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.UserRole_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.UserRole_tbl
END

CREATE TABLE dbo.UserRole_tbl
(
	UserRoleId INT IDENTITY(1,1) NOT NULL,
	UserRoleName VARCHAR(50) NOT NULL,
	Description VARCHAR(500) NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy INT NOT NULL,
	IsActive BIT NOT NULL
)
GO

ALTER TABLE dbo.UserRole_tbl
ADD CONSTRAINT PK_UserRole_RoleId PRIMARY KEY (UserRoleId)
GO

ALTER TABLE dbo.UserRole_tbl
ADD CONSTRAINT DF_UserRole_Date DEFAULT GETDATE() FOR LastModifiedOn
GO

ALTER TABLE dbo.UserRole_tbl
ADD CONSTRAINT FK_UserRole_LastModified FOREIGN KEY(LastModifiedBy) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.UserRole_tbl
ADD CONSTRAINT DF_UserRole_IsActive DEFAULT 1 FOR IsActive
GO