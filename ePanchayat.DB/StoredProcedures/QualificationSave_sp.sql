USE [ePanchayat]
GO

IF OBJECT_ID('dbo.QualificationSave_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.QualificationSave_sp
END
GO

CREATE PROCEDURE dbo.QualificationSave_sp
(
	@QualificationId INT
	,@UserId INT
	,@Qualification VARCHAR(50)
	,@Major VARCHAR(50)
	,@PassingYear INT
	,@LastModifiedBy VARCHAR(50)
	,@IsActive BIT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.Qualification_tbl WHERE QualificationId = @QualificationId)
	BEGIN
		UPDATE dbo.Qualification_tbl
		SET
			UserId = @UserId
			,Qualification = @Qualification
			,Major = @Major
			,PassingYear = @PassingYear
			,LastModifiedOn = GETDATE()
			,LastModifiedBy = @LastModifiedBy
			,IsActive = @IsActive
		WHERE
			QualificationId = @QualificationId
	END
	ELSE
	BEGIN
		INSERT INTO dbo.Qualification_tbl
		(
			UserId
			,Qualification
			,Major
			,PassingYear
			,LastModifiedBy
		)
		VALUES
		(
			@UserId
			,@Qualification
			,@Major
			,@PassingYear
			,@LastModifiedBy
		)
	END
END
GO