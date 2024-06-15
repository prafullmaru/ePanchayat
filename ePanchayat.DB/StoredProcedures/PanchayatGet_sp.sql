USE [ePanchayat]
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
		[PanchayatId]
		,[PanchayatName]
		,[LastModifiedOn]
		,[LastModifiedBy]
		,[IsActive]
	FROM
		[dbo].[Panchayat_tbl]
	WHERE
		[PanchayatName] = ISNULL(@PanchayatName, [PanchayatName])
		AND [IsActive] = 1
END
GO