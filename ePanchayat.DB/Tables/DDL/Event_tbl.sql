-- TODO - Finalize fields and prepare CRUD stored procs

USE [ePanchayat]
GO
 
SET ANSI_NULLS ON
GO
 
SET QUOTED_IDENTIFIER ON
GO
 
IF OBJECT_ID('dbo.Event_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Event_tbl
END
 
CREATE TABLE dbo.Event_tbl
(
	EventId INT IDENTITY(1,1) NOT NULL,
	EventTitle VARCHAR(200) NOT NULL,
	Description VARCHAR(1000) NOT NULL,
	EventDate DATETIME NOT NULL,
	EventTimeFrom DATETIME NOT NULL,
	EventTimeTo DATETIME NOT NULL,
	EventHostId INT NOT NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy VARCHAR(50) NOT NULL,
	IsActive BIT NOT NULL
)
GO