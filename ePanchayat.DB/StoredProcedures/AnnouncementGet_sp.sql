USE [ePanchayat]
GO

IF OBJECT_ID('dbo.AnnouncementGet_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.AnnouncementGet_sp
END
GO

CREATE PROCEDURE dbo.AnnouncementGet_sp
(
	@AnnouncementId INT = NULL,
	@AnnouncementTitle VARCHAR(200)= NULL
)
AS
BEGIN
	SELECT
		AnnouncementId
		,AnnouncementTitle
		,Description
		,DisplayTill
		,Category
		,RegistrationNumber
		,OwnerId
		,LastModifiedOn
		,LastModifiedBy
		,IsActive
	FROM
		dbo.Announcement_tbl
	WHERE
		(
			AnnouncementId = ISNULL(@AnnouncementId, AnnouncementId)
			OR CHARINDEX(@AnnouncementTitle, AnnouncementTitle) > 0
		)
		AND IsActive = 1
END
GO