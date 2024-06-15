USE [ePanchayat]
GO

IF OBJECT_ID('dbo.UserRoleAccessSave_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.UserRoleAccessSave_sp
END
GO

CREATE PROCEDURE dbo.UserRoleAccessSave_sp
(
	@UserRoleAccessId INT
	,@UserId INT
	,@RoleId INT
	,@LastModifiedBy VARCHAR(50)
	,@IsActive BIT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM [dbo].[UserRoleAccess_tbl] WHERE [UserRoleAccessId] = @UserRoleAccessId)
	BEGIN
		UPDATE [dbo].[UserRoleAccess_tbl]
		SET
			[UserId] = @UserId
			,[RoleId] = @RoleId
			,[LastModifiedOn] = GETDATE()
			,[LastModifiedBy] = @LastModifiedBy
			,[IsActive] = @IsActive
		WHERE
			[UserRoleAccessId] = @UserRoleAccessId
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[UserRoleAccess_tbl]
		(
			[UserId]
			,[RoleId]
			,[LastModifiedBy]
		)
		VALUES
		(
			@UserId
			,@RoleId
			,@LastModifiedBy
		)	
	END
END
GO