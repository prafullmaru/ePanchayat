USE [ePanchayat]
GO

IF OBJECT_ID('dbo.HouseDelete_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.HouseDelete_sp
END
GO

CREATE PROCEDURE dbo.HouseDelete_sp
(
	@HouseId INT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.House_tbl WHERE HouseId = @HouseId)
	BEGIN
		UPDATE dbo.House_tbl
		SET
			IsActive = 0
		WHERE
			HouseId = @HouseId
	END
END
GO