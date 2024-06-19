USE [ePanchayat]
GO

IF OBJECT_ID('dbo.UserSave_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.UserSave_sp
END
GO

CREATE PROCEDURE dbo.UserSave_sp
(
	@UserId INT
	,@UserLogin VARCHAR(50)
	,@FirstName VARCHAR(50)
	,@LastName VARCHAR(50)
	,@MobileNo VARCHAR(15)
	,@Email VARCHAR(50)
	,@ProfilePhoto VARBINARY(MAX)
	,@Address VARCHAR(500)
	,@LastModifiedBy VARCHAR(50)
	,@IsActive BIT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM [User_tbl] WHERE [UserId] = @UserId)
	BEGIN
		UPDATE [dbo].[User_tbl]
		SET
			[UserLogin] = @UserLogin
			,[FirstName] = @FirstName
			,[LastName] = @LastName
			,[MobileNo] = @MobileNo
			,[Email] = @Email
			,[ProfilePhoto] = @ProfilePhoto
			,[Address] = @Address
			,[LastModifiedOn] = GETDATE()
			,[LastModifiedBy] = @LastModifiedBy
			,[IsActive] = @IsActive
		WHERE
			[UserId] = @UserId
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[User_tbl]
		(
			[UserLogin]
			,[FirstName]
			,[LastName]
			,[MobileNo]
			,[Email]
			,[ProfilePhoto]
			,[Address]
			,[LastModifiedBy]
		)
		VALUES
		(
			@UserLogin
			,@FirstName
			,@LastName
			,@MobileNo
			,@Email
			,@ProfilePhoto
			,@Address
			,@LastModifiedBy
		)	
	END
END
GO