USE [ePanchayat]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.UserRoleAccess_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.UserRoleAccess_tbl
END

CREATE TABLE dbo.UserRoleAccess_tbl
(
	UserRoleAccessId INT IDENTITY(1,1) NOT NULL,
	UserId INT NOT NULL,
	UserRoleId INT NOT NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy INT NOT NULL,
	IsActive BIT NOT NULL
)
GO

ALTER TABLE dbo.UserRoleAccess_tbl
ADD CONSTRAINT FK_User_UserId FOREIGN KEY(UserId) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.UserRoleAccess_tbl
ADD CONSTRAINT FK_UserRole_RoleId FOREIGN KEY(UserRoleId) REFERENCES dbo.UserRole_tbl(UserRoleId)
GO

ALTER TABLE dbo.UserRoleAccess_tbl
ADD CONSTRAINT PK_UserRoleAccess_UserRoleAccessId PRIMARY KEY (UserRoleAccessId)
GO

ALTER TABLE dbo.UserRoleAccess_tbl
ADD CONSTRAINT DF_UserRoleAccess_Date DEFAULT GETDATE() FOR LastModifiedOn
GO

ALTER TABLE dbo.UserRoleAccess_tbl
ADD CONSTRAINT FK_UserRoleAccess_LastModified FOREIGN KEY(LastModifiedBy) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.UserRoleAccess_tbl
ADD CONSTRAINT DF_UserRoleAccess_IsActive DEFAULT 1 FOR IsActive
GO