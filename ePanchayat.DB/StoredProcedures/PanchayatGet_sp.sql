USE ePanchayat
GO

IF OBJECT_ID('dbo.PanchayatGet_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.PanchayatGet_sp
END
GO

CREATE PROCEDURE dbo.PanchayatGet_sp
(
	@PanchayatName VARCHAR(50) = NULL
)
AS
BEGIN
	SELECT
		 P.PanchayatId
		,P.PanchayatName
		,P.LastModifiedOn
		,P.LastModifiedBy
		,Modified.FirstName + ' ' + Modified.LastName AS 'LastModifiedByName'
		,P.IsActive
	FROM
		dbo.Panchayat_tbl P
		LEFT JOIN dbo.User_tbl Modified ON P.LastModifiedBy = Modified.UserId
	WHERE
		PanchayatName = ISNULL(@PanchayatName, PanchayatName)
		AND P.IsActive = 1
END
GO