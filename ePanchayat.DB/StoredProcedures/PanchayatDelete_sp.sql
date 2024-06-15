USE [ePanchayat]
GO

IF OBJECT_ID('dbo.PanchayatDelete_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.PanchayatDelete_sp
END
GO

CREATE PROCEDURE dbo.PanchayatDelete_sp
(
	@PanchayatId INT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM [dbo].[Panchayat_tbl] WHERE [PanchayatId] = @PanchayatId)
	BEGIN
		UPDATE [dbo].[Panchayat_tbl]
		SET
			[IsActive] = 0
		WHERE
			[PanchayatId] = @PanchayatId
	END
END
GO