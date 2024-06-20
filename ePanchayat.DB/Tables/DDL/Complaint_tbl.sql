-- TODO - Finalize fields and prepare CRUD stored procs

USE [ePanchayat]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.Complaint_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Complaint_tbl
END

CREATE TABLE dbo.Complaint_tbl
(
	ComplaintId INT IDENTITY(1,1) NOT NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy VARCHAR(50) NOT NULL,
	IsActive BIT NOT NULL
)
GO