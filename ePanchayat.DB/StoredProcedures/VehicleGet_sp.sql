USE [ePanchayat]
GO

IF OBJECT_ID('dbo.VehicleGet_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.VehicleGet_sp
END
GO

CREATE PROCEDURE dbo.VehicleGet_sp
(
	@VehicleId INT = NULL,
	@RegistrationNumber VARCHAR(50)= NULL
)
AS
BEGIN
	SELECT
		VehicleId
		,Category
		,RegistrationNumber
		,OwnerId
		,LastModifiedOn
		,LastModifiedBy
		,IsActive
	FROM
		dbo.Vehicle_tbl
	WHERE
		VehicleId = @VehicleId
		AND RegistrationNumber = ISNULL(@RegistrationNumber, RegistrationNumber)
		AND IsActive = 1
END
GO