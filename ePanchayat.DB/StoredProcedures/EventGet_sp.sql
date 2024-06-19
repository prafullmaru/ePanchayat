USE [ePanchayat]
GO

IF OBJECT_ID('dbo.EventGet_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.EventGet_sp
END
GO

CREATE PROCEDURE dbo.EventGet_sp
(
	@EventId INT = NULL,
	@EventTitle VARCHAR(200)= NULL
)
AS
BEGIN
	SELECT
		EventId,
		EventTitle,
		Description,
		EventDate,
		EventTimeFrom,
		EventTimeTo,
		EventHostId,
		LastModifiedOn,
		LastModifiedBy,
		IsActive
	FROM
		dbo.Event_tbl
	WHERE
		(
			EventId = ISNULL(@EventId, EventId)
			OR CHARINDEX(@EventTitle, EventTitle) > 0
		)
		AND IsActive = 1
END
GO