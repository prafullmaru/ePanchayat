USE [ePanchayat]
GO

IF OBJECT_ID('dbo.EventSave_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.EventSave_sp
END
GO

CREATE PROCEDURE dbo.EventSave_sp
(
	@EventId INT
	,@EventTitle VARCHAR(200)
	,@Description VARCHAR(1000)
	,@EventDate DATETIME
	,@EventTimeFrom DATETIME
	,@EventTimeTo DATETIME
	,@EventHostId INT
	,@LastModifiedBy VARCHAR(50)
	,@IsActive BIT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.Event_tbl WHERE EventId = @EventId)
	BEGIN
		UPDATE dbo.Event_tbl
		SET
			EventTitle = @EventTitle
			,Description = @Description
			,EventDate = @EventDate
			,EventTimeFrom = @EventTimeFrom
			,EventTimeTo = @EventTimeTo
			,EventHostId = @EventHostId
			,LastModifiedOn = GETDATE()
			,LastModifiedBy = @LastModifiedBy
			,IsActive = @IsActive
		WHERE
			EventId = @EventId
	END
	ELSE
	BEGIN
		INSERT INTO dbo.Event_tbl
		(
			EventTitle
			,Description
			,EventDate
			,EventTimeFrom
			,EventTimeTo
			,EventHostId
			,LastModifiedBy
		)
		VALUES
		(
			@EventTitle
			,@Description
			,@EventDate
			,@EventTimeFrom
			,@EventTimeTo
			,@EventHostId
			,@LastModifiedBy
		)
	END
END
GO