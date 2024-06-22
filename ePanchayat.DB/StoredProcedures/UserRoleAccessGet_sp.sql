USE ePanchayat
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
		 URA.UserRoleAccessId
		,URA.UserId
		,U.FirstName + ' ' + U.LastName AS 'UserFullName'
		,URA.UserRoleId
		,UR.UserRoleName
		,URA.LastModifiedOn
		,URA.LastModifiedBy
		,Modified.FirstName + ' ' + Modified.LastName AS 'LastModifiedByFullName'
		,URA.IsActive
	FROM
		dbo.UserRoleAccess_tbl URA
		LEFT JOIN dbo.UserRole_tbl UR ON URA.UserRoleId = UR.UserRoleId
		LEFT JOIN dbo.User_tbl U ON URA.UserRoleId = U.UserId
		LEFT JOIN dbo.User_tbl Modified ON URA.LastModifiedBy = Modified.UserId
	WHERE
		UserRoleAccessId = ISNULL(@UserRoleAccessId, UserRoleAccessId)
		AND URA.IsActive = 1
END
GO