USE [ePanchayat]
GO

IF OBJECT_ID('dbo.UserRoleAccessGet_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.UserRoleAccessGet_sp
END
GO

CREATE PROCEDURE dbo.UserRoleAccessGet_sp
(
	@UserRoleAccessId INT = NULL
)
AS
BEGIN
	SELECT
		[UserRoleAccessId]
		,[UserId]
		,[UserRoleId]
		,[LastModifiedOn]
		,[LastModifiedBy]
		,[IsActive]
	FROM
		[dbo].[UserRoleAccess_tbl]
	WHERE
		[UserRoleAccessId] = ISNULL(@UserRoleAccessId, [UserRoleAccessId])
END
GO