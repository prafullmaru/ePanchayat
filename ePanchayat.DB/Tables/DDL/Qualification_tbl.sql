USE [ePanchayat]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.Qualification_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Qualification_tbl
END

CREATE TABLE dbo.Qualification_tbl
(
	QualificationId INT IDENTITY(1,1) NOT NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy VARCHAR(50) NOT NULL,
	IsActive BIT NOT NULL
)
GO