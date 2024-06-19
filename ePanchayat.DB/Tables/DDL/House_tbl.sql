USE [ePanchayat]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.House_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.House_tbl
END

CREATE TABLE dbo.House_tbl
(
	HouseId INT IDENTITY(1,1) NOT NULL,
	HouseNumber VARCHAR(50) NOT NULL,
	OwnerId INT NOT NULL,
	Landmark VARCHAR(50) NOT NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy INT NOT NULL,
	IsActive BIT NOT NULL
)
GO

ALTER TABLE dbo.House_tbl
ADD CONSTRAINT PK_House_HouseId PRIMARY KEY (HouseId)
GO

ALTER TABLE dbo.House_tbl
ADD CONSTRAINT FK_House_OwnerId FOREIGN KEY(OwnerId) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.House_tbl
ADD CONSTRAINT UK_House_HouseNumber UNIQUE (HouseNumber)
GO

ALTER TABLE dbo.House_tbl
ADD CONSTRAINT DF_House_Date DEFAULT GETDATE() FOR LastModifiedOn
GO

ALTER TABLE dbo.House_tbl
ADD CONSTRAINT FK_House_LastModified FOREIGN KEY(LastModifiedBy) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.House_tbl
ADD CONSTRAINT DF_House_IsActive DEFAULT 1 FOR IsActive
GO