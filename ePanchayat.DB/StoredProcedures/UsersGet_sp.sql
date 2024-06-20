USE [ePanchayat]
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
		[UserId]
		,[UserLogin]
		,[FirstName]
		,[LastName]
		,[MobileNo]
		,[Email]
		,[ProfilePhoto]
		,[Address]
		,[LastModifiedOn]
		,[LastModifiedBy]
		,[IsActive]
	FROM
		[dbo].[User_tbl]
	WHERE
		(
			[UserId] = @UserId
			OR
			(
				[UserId] IS NULL
				AND
					([UserLogin] = ISNULL(@UserLogin, [UserLogin])
					OR [FirstName] = ISNULL(@FirstName, [FirstName])
					OR [LastName] = ISNULL(@LastName, [LastName])
					OR [MobileNo] = ISNULL(@MobileNo, [MobileNo])
					OR [Email] = ISNULL(@Email, [Email])
					OR CHARINDEX(@Address, [Address]) > 0
				)
			)
		)
		AND [IsActive] = 1
END
GO