USE [ePanchayat]
GO

IF OBJECT_ID('dbo.VehicleDelete_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.VehicleDelete_sp
END
GO

CREATE PROCEDURE dbo.VehicleDelete_sp
(
	@VehicleId INT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.Vehicle_tbl WHERE VehicleId = @VehicleId)
	BEGIN
		UPDATE dbo.Vehicle_tbl
		SET
			IsActive = 0
		WHERE
			VehicleId = @VehicleId
	END
END
GO