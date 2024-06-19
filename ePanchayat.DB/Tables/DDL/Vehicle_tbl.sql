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
	LastModifiedBy VARCHAR(50) NOT NULL,
	IsActive BIT NOT NULL
)
GO