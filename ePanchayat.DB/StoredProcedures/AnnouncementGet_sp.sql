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
		 A.AnnouncementId
		,A.AnnouncementTitle
		,A.Description
		,A.DisplayTill
		,A.LastModifiedOn
		,A.LastModifiedBy
		,Modified.FirstName + ' ' + Modified.LastName AS 'LastModifiedByFullName'
		,A.IsActive
	FROM
		dbo.Announcement_tbl A
		LEFT JOIN dbo.User_tbl Modified ON A.LastModifiedBy = Modified.UserId
	WHERE
		(
			AnnouncementId = ISNULL(@AnnouncementId, AnnouncementId)
			OR CHARINDEX(@AnnouncementTitle, AnnouncementTitle) > 0
		)
		AND A.IsActive = 1
END
GO