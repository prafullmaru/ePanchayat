USE [ePanchayat]
GO

IF OBJECT_ID('dbo.PanchayatSave_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.PanchayatSave_sp
END
GO

CREATE PROCEDURE dbo.PanchayatSave_sp
(
	@PanchayatId INT,
	@PanchayatName VARCHAR(50),
	@LastModifiedBy VARCHAR(50),
	@IsActive BIT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM [dbo].[Panchayat_tbl] WHERE [PanchayatId] = @PanchayatId)
	BEGIN
		UPDATE [dbo].[Panchayat_tbl]
		SET
			[PanchayatName] = @PanchayatName
			,[LastModifiedOn] = GETDATE()
			,[LastModifiedBy] = @LastModifiedBy
			,[IsActive] = @IsActive
		WHERE
			[PanchayatId] = @PanchayatId
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[Panchayat_tbl]
		(
			[PanchayatName]
			,[LastModifiedBy]
		)
		VALUES
		(
			@PanchayatName
			,@LastModifiedBy
		)
	END
END
GO