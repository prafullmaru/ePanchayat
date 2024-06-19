USE [ePanchayat]
GO

IF OBJECT_ID('dbo.QualificationGet_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.QualificationGet_sp
END
GO

CREATE PROCEDURE dbo.QualificationGet_sp
(
	@QualificationId INT = NULL
	,@Qualification VARCHAR(50)= NULL
)
AS
BEGIN
	SELECT
		QualificationId
		,UserId
		,Qualification
		,Major
		,PassingYear
		,LastModifiedOn
		,LastModifiedBy
		,IsActive
	FROM
		dbo.Qualification_tbl
	WHERE
		(
			QualificationId = @QualificationId
			OR Qualification = ISNULL(@Qualification, Qualification)
		)
		AND IsActive = 1
END
GO