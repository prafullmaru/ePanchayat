USE ePanchayat
GO

IF OBJECT_ID('dbo.UsersGet_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.UsersGet_sp
END
GO

CREATE PROCEDURE dbo.UsersGet_sp
(
	@UserId INT = NULL
	,@UserLogin VARCHAR(50) = NULL
	,@FirstName VARCHAR(50) = NULL
	,@LastName VARCHAR(50) = NULL
	,@MobileNo VARCHAR(15) = NULL
	,@Email VARCHAR(50) = NULL
	,@Address VARCHAR(500) = NULL
)
AS
BEGIN
	SELECT
		 U.UserId
		,U.UserLogin
		,U.FirstName
		,U.LastName
		,U.MobileNo
		,U.Email
		,U.ProfilePhoto
		,U.Address
		,U.LastModifiedOn
		,U.LastModifiedBy
		,Modified.FirstName + ' ' + Modified.LastName AS 'LastModifiedByFullName'
		,U.IsActive
	FROM
		dbo.User_tbl U
		LEFT JOIN dbo.User_tbl Modified ON U.LastModifiedBy = Modified.UserId
	WHERE
		(
			U.UserId = @UserId
			OR
			(
				U.UserId IS NULL
				AND
					(U.UserLogin = ISNULL(@UserLogin, U.UserLogin)
					OR U.FirstName = ISNULL(@FirstName, U.FirstName)
					OR U.LastName = ISNULL(@LastName, U.LastName)
					OR U.MobileNo = ISNULL(@MobileNo, U.MobileNo)
					OR U.Email = ISNULL(@Email, U.Email)
					OR CHARINDEX(@Address, U.Address) > 0
				)
			)
		)
		AND U.IsActive = 1
END
GO