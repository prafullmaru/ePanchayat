USE [ePanchayat]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.Vehicle_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Vehicle_tbl
END

CREATE TABLE dbo.Vehicle_tbl
(
	VehicleId INT IDENTITY(1,1) NOT NULL,
	Category VARCHAR(50) NOT NULL,
	RegistrationNumber VARCHAR(50) NOT NULL,
	OwnerId INT NOT NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy INT NOT NULL,
	IsActive BIT NOT NULL
)
GO

ALTER TABLE dbo.Vehicle_tbl
ADD CONSTRAINT PK_Vehicle_VehicleId PRIMARY KEY (VehicleId)
GO

ALTER TABLE dbo.Vehicle_tbl
ADD CONSTRAINT FK_Vehicle_OwnerId FOREIGN KEY(OwnerId) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.Vehicle_tbl
ADD CONSTRAINT UK_Vehicle_RegistrationNumber UNIQUE (RegistrationNumber)
GO

ALTER TABLE dbo.Vehicle_tbl
ADD CONSTRAINT DF_Vehicle_Date DEFAULT GETDATE() FOR LastModifiedOn
GO

ALTER TABLE dbo.Vehicle_tbl
ADD CONSTRAINT FK_Vehicle_LastModified FOREIGN KEY(LastModifiedBy) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.Vehicle_tbl
ADD CONSTRAINT DF_Vehicle_IsActive DEFAULT 1 FOR IsActive
GO