USE [ePanchayat]
GO

IF OBJECT_ID('dbo.VehicleSave_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.VehicleSave_sp
END
GO

CREATE PROCEDURE dbo.VehicleSave_sp
(
	@VehicleId INT
	,@Category VARCHAR(50)
	,@RegistrationNumber VARCHAR(50)
	,@OwnerId INT
	,@LastModifiedBy VARCHAR(50)
	,@IsActive BIT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.Vehicle_tbl WHERE VehicleId = @VehicleId)
	BEGIN
		UPDATE dbo.Vehicle_tbl
		SET
			Category = @Category
			,RegistrationNumber = @RegistrationNumber
			,OwnerId = @OwnerId
			,LastModifiedOn = GETDATE()
			,LastModifiedBy = @LastModifiedBy
			,IsActive = @IsActive
		WHERE
			VehicleId = @VehicleId
	END
	ELSE
	BEGIN
		INSERT INTO dbo.Vehicle_tbl
		(
			Category
			,RegistrationNumber
			,OwnerId
			,LastModifiedBy
		)
		VALUES
		(
			@Category
			,@RegistrationNumber
			,@OwnerId
			,@LastModifiedBy
		)
	END
END
GO