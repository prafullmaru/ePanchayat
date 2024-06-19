USE [ePanchayat]
GO

IF OBJECT_ID('dbo.EventDelete_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.EventDelete_sp
END
GO

CREATE PROCEDURE dbo.EventDelete_sp
(
	@EventId INT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.Event_tbl WHERE EventId = @EventId)
	BEGIN
		UPDATE dbo.Event_tbl
		SET
			IsActive = 0
		WHERE
			EventId = @EventId
	END
END
GO