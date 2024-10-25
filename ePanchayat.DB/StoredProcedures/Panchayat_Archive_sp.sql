IF OBJECT_ID('dbo.Panchayat_Archive_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.Panchayat_Archive_sp
END
GO

CREATE PROCEDURE dbo.Panchayat_Archive_sp
(
	@Date date 
)
AS
BEGIN
 INSERT INTO dbo.Panchayat_tbl_history (PanchayatId,PanchayatName,LastModifiedOn,LastModifiedBy,IsActive)
	SELECT
		 H.PanchayatId
		,H.PanchayatName
		,H.LastModifiedOn
		,H.LastModifiedBy
		,H.IsActive
	FROM
		dbo.Panchayat_tbl H
	WHERE
		LastModifiedOn < @Date
END
GO