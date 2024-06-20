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
		 V.VehicleId
		,V.Category
		,V.RegistrationNumber
		,V.OwnerId
		,U.FirstName + ' ' + U.LastName AS 'OwnerFullName'
		,V.LastModifiedOn
		,V.LastModifiedBy
		,Modified.FirstName + ' ' + Modified.LastName AS 'LastModifiedByFullName'
		,V.IsActive
	FROM
		dbo.Vehicle_tbl V
		LEFT JOIN dbo.User_tbl U ON V.OwnerId = U.UserId
		LEFT JOIN dbo.User_tbl Modified ON V.LastModifiedBy = Modified.UserId
	WHERE
		VehicleId = @VehicleId
		AND RegistrationNumber = ISNULL(@RegistrationNumber, RegistrationNumber)
		AND V.IsActive = 1
END
GO