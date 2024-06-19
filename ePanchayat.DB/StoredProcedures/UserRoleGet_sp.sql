USE [ePanchayat]
GO

IF OBJECT_ID('dbo.UserRoleGet_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.UserRoleGet_sp
END
GO

CREATE PROCEDURE dbo.UserRoleGet_sp
(
	@RoleId INT
)
AS
BEGIN
	SELECT
		[UserRoleId]
		,[UserRoleName]
		,[Description]
		,[LastModifiedOn]
		,[LastModifiedBy]
		,[IsActive]
	FROM
		[dbo].[UserRole_tbl]
	WHERE
		[UserRoleId] = ISNULL(@RoleId, [UserRoleId])
END
GO