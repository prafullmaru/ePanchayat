USE [ePanchayat]
GO

IF OBJECT_ID('dbo.AnnouncementDelete_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.AnnouncementDelete_sp
END
GO

CREATE PROCEDURE dbo.AnnouncementDelete_sp
(
	@AnnouncementId INT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.Announcement_tbl WHERE AnnouncementId = @AnnouncementId)
	BEGIN
		UPDATE dbo.Announcement_tbl
		SET
			IsActive = 0
		WHERE
			AnnouncementId = @AnnouncementId
	END
END
GO