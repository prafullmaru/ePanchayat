USE [ePanchayat]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.Panchayat_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Panchayat_tbl
END

CREATE TABLE dbo.Panchayat_tbl
(
	PanchayatId INT IDENTITY(1,1) NOT NULL,
	PanchayatName VARCHAR(50) NOT NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy INT NOT NULL,
	IsActive BIT NOT NULL
)
GO

ALTER TABLE dbo.Panchayat_tbl
ADD CONSTRAINT PK_Panchayat_Id PRIMARY KEY (PanchayatId)
GO

ALTER TABLE dbo.Panchayat_tbl
ADD CONSTRAINT UK_Panchayat_Name UNIQUE (PanchayatName)
GO

ALTER TABLE dbo.Panchayat_tbl
ADD CONSTRAINT DF_Panchayat_Date DEFAULT GETDATE() FOR LastModifiedOn
GO

ALTER TABLE dbo.Panchayat_tbl
ADD CONSTRAINT FK_Panchayat_LastModified FOREIGN KEY(LastModifiedBy) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.Panchayat_tbl
ADD CONSTRAINT DF_Panchayat_IsActive DEFAULT 1 FOR IsActive
GO