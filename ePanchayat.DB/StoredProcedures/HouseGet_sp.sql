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
		 H.HouseId
		,H.HouseNumber
		,H.OwnerId
		,U.FirstName + ' ' + U.LastName AS 'OwnerFullName'
		,H.Landmark
		,H.LastModifiedOn
		,H.LastModifiedBy
		,Modified.FirstName + ' ' + Modified.LastName AS 'LastModifiedByFullName'
		,H.IsActive
	FROM
		dbo.House_tbl H
		LEFT JOIN dbo.User_tbl U ON H.OwnerId = U.UserId
		LEFT JOIN dbo.User_tbl Modified ON H.LastModifiedBy = Modified.UserId
	WHERE
		HouseId = ISNULL(@HouseId, HouseId)
		AND H.IsActive = 1
END
GO