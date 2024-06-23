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
	LastModifiedBy INT NOT NULL,
	IsActive BIT NOT NULL
)
GO

ALTER TABLE dbo.Complaint_tbl
ADD CONSTRAINT PK_Complaint_ComplaintId PRIMARY KEY (ComplaintId)
GO

ALTER TABLE dbo.Complaint_tbl
ADD CONSTRAINT DF_Complaint_Date DEFAULT GETDATE() FOR LastModifiedOn
GO

ALTER TABLE dbo.Complaint_tbl
ADD CONSTRAINT FK_Complaint_LastModified FOREIGN KEY(LastModifiedBy) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.Complaint_tbl
ADD CONSTRAINT DF_Complaint_IsActive DEFAULT 1 FOR IsActive
GO