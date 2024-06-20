USE [ePanchayat]
GO

IF OBJECT_ID('dbo.HouseSave_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.HouseSave_sp
END
GO

CREATE PROCEDURE dbo.HouseSave_sp
(
	@HouseId INT
	,@HouseNumber VARCHAR(50)
	,@OwnerId INT
	,@Landmark VARCHAR(50)
	,@LastModifiedBy VARCHAR(50)
	,@IsActive BIT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.House_tbl WHERE HouseId = @HouseId)
	BEGIN
		UPDATE dbo.House_tbl
		SET
			HouseNumber = @HouseNumber
			,OwnerId = @OwnerId
			,Landmark = @Landmark
			,LastModifiedOn = GETDATE()
			,LastModifiedBy = @LastModifiedBy
			,IsActive = @IsActive
		WHERE
			HouseId = @HouseId
	END
	ELSE
	BEGIN
		INSERT INTO dbo.House_tbl
		(
			HouseNumber
			,OwnerId
			,Landmark
			,LastModifiedBy
		)
		VALUES
		(
			@HouseNumber
			,@OwnerId
			,@Landmark
			,@LastModifiedBy
		)
	END
END
GO