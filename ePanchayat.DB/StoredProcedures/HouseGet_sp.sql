USE [ePanchayat]
GO

IF OBJECT_ID('dbo.HouseGet_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.HouseGet_sp
END
GO

CREATE PROCEDURE dbo.HouseGet_sp
(
	@HouseId INT = NULL
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
		dbo.House_tbl
	WHERE
		HouseId = ISNULL(@HouseId, HouseId)
		AND IsActive = 1
END
GO