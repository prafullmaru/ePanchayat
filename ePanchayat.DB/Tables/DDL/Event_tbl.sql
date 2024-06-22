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
	LastModifiedBy INT NOT NULL,
	IsActive BIT NOT NULL
)
GO

ALTER TABLE dbo.Event_tbl
ADD CONSTRAINT PK_Event_EventId PRIMARY KEY (EventId)
GO

ALTER TABLE dbo.Event_tbl
ADD CONSTRAINT FK_Event_EventHost FOREIGN KEY(EventHostId) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.Event_tbl
ADD CONSTRAINT DF_Event_Date DEFAULT GETDATE() FOR LastModifiedOn
GO

ALTER TABLE dbo.Event_tbl
ADD CONSTRAINT FK_Event_LastModified FOREIGN KEY(LastModifiedBy) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.Event_tbl
ADD CONSTRAINT DF_Event_IsActive DEFAULT 1 FOR IsActive
GO