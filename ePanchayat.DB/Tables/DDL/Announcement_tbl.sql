USE [ePanchayat]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.Announcement_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Announcement_tbl
END

CREATE TABLE dbo.Announcement_tbl
(
	AnnouncementId INT IDENTITY(1,1) NOT NULL,
	AnnouncementTitle VARCHAR(200) NOT NULL,
	Description VARCHAR(1000) NOT NULL,
	DisplayTill DATETIME NOT NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy INT NOT NULL,
	IsActive BIT NOT NULL
)
GO

ALTER TABLE dbo.Announcement_tbl
ADD CONSTRAINT PK_Announcement_EventId PRIMARY KEY (AnnouncementId)
GO

ALTER TABLE dbo.Announcement_tbl
ADD CONSTRAINT DF_Announcement_Date DEFAULT GETDATE() FOR LastModifiedOn
GO

ALTER TABLE dbo.Announcement_tbl
ADD CONSTRAINT FK_Announcement_LastModified FOREIGN KEY(LastModifiedBy) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.Announcement_tbl
ADD CONSTRAINT DF_Announcement_IsActive DEFAULT 1 FOR IsActive
GO