USE [ePanchayat]
GO

IF OBJECT_ID('dbo.UserRoleSave_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.UserRoleSave_sp
END
GO

CREATE PROCEDURE dbo.UserRoleSave_sp
(
	@RoleId INT
	,@RoleName VARCHAR(50)
	,@Description VARCHAR(500)
	,@LastModifiedBy VARCHAR(50)
	,@IsActive BIT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM [dbo].[UserRole_tbl] WHERE [RoleId] = @RoleId)
	BEGIN
		UPDATE [dbo].[UserRole_tbl]
		SET
			[RoleName] = @RoleName
			,[Description] = @Description
			,[LastModifiedOn] = GETDATE()
			,[LastModifiedBy] = @LastModifiedBy
			,[IsActive] = @IsActive
		WHERE
			[RoleId] = @RoleId
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[UserRole_tbl]
		(
			[RoleName]
			,[Description]
			,[LastModifiedBy]
		)
		VALUES
		(
			@RoleName
			,@Description
			,@LastModifiedBy
		)	
	END
END
GO