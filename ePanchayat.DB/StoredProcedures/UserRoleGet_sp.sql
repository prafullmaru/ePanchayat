USE ePanchayat
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
		R.UserRoleId
		,R.UserRoleName
		,R.Description
		,R.LastModifiedOn
		,R.LastModifiedBy
		,Modified.FirstName + ' ' + Modified.LastName AS 'LastModifiedByFullName'
		,R.IsActive
	FROM
		dbo.UserRole_tbl R
		LEFT JOIN dbo.User_tbl Modified ON R.LastModifiedBy = Modified.UserId
	WHERE
		UserRoleId = ISNULL(@RoleId, UserRoleId)
END
GO