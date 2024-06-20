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
		E.EventId
		,E.EventTitle
		,E.Description
		,E.EventDate
		,E.EventTimeFrom
		,E.EventTimeTo
		,E.EventHostId
		,U.FirstName + ' ' + U.LastName AS 'EventHostFullName'
		,E.LastModifiedOn
		,E.LastModifiedBy
		,Modified.FirstName + ' ' + Modified.LastName AS 'LastModifiedByFullName'
		,E.IsActive
	FROM
		dbo.Event_tbl E
		LEFT JOIN dbo.User_tbl U ON E.EventHostId = U.UserId
		LEFT JOIN dbo.User_tbl Modified ON E.LastModifiedBy = Modified.UserId
	WHERE
		(
			EventId = ISNULL(@EventId, EventId)
			OR CHARINDEX(@EventTitle, EventTitle) > 0
		)
		AND E.IsActive = 1
END
GO