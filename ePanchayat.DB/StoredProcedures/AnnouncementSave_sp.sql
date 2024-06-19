USE [ePanchayat]
GO

IF OBJECT_ID('dbo.AnnouncementSave_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.AnnouncementSave_sp
END
GO

CREATE PROCEDURE dbo.AnnouncementSave_sp
(
	@AnnouncementId INT
	,@AnnouncementTitle VARCHAR(200)
	,@Description VARCHAR(1000)
	,@DisplayTill DATETIME
	,@LastModifiedBy VARCHAR(50)
	,@IsActive BIT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.Announcement_tbl WHERE AnnouncementId = @AnnouncementId)
	BEGIN
		UPDATE dbo.Announcement_tbl
		SET
			AnnouncementTitle = @AnnouncementTitle
			,Description = @Description
			,DisplayTill = @DisplayTill
			,LastModifiedOn = GETDATE()
			,LastModifiedBy = @LastModifiedBy
			,IsActive = @IsActive
		WHERE
			AnnouncementId = @AnnouncementId
	END
	ELSE
	BEGIN
		INSERT INTO dbo.Announcement_tbl
		(
			@AnnouncementTitle
			,@Description
			,@DisplayTill
			,@LastModifiedBy
		)
		VALUES
		(
			@AnnouncementTitle
			,@Description
			,@DisplayTill
			,@LastModifiedBy
		)
	END
END
GO