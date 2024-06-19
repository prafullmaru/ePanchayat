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
	LastModifiedBy VARCHAR(50) NOT NULL,
	IsActive BIT NOT NULL
)
GO