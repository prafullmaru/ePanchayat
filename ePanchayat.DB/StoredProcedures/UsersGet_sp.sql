USE [ePanchayat]
GO

IF OBJECT_ID('dbo.UserGet_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.UserGet_sp
END
GO

CREATE PROCEDURE dbo.UserGet_sp
(
	@UserId INT
	,@UserLogin VARCHAR(50)
	,@FirstName VARCHAR(50)
	,@LastName VARCHAR(50)
	,@MobileNo VARCHAR(15)
	,@Email VARCHAR(50)
	,@Address VARCHAR(500)
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
			[UserId] = ISNULL(@UserId, [UserId])
			OR [UserLogin] = ISNULL(@UserLogin, [UserLogin])
			OR [FirstName] = ISNULL(@FirstName, [FirstName])
			OR [LastName] = ISNULL(@LastName, [LastName])
			OR [MobileNo] = ISNULL(@MobileNo, [MobileNo])
			OR [Email] = ISNULL(@Email, [Email])
			OR CHARINDEX(@Address, [Address]) > 0
		)
		AND [IsActive] = 1
END
GO