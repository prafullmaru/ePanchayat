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
		 Q.QualificationId
		,Q.UserId
		,U.FirstName + ' ' + U.LastName AS 'UserFullName'
		,Q.Qualification
		,Q.Major
		,Q.PassingYear
		,Q.LastModifiedOn
		,Q.LastModifiedBy
		,Modified.FirstName + ' ' + Modified.LastName AS 'LastModifiedByFullName'
		,Q.IsActive
	FROM
		dbo.Qualification_tbl Q
		LEFT JOIN dbo.User_tbl U ON Q.UserId = U.UserId
		LEFT JOIN dbo.User_tbl Modified ON Q.LastModifiedBy = Modified.UserId
	WHERE
		(
			QualificationId = @QualificationId
			OR Qualification = ISNULL(@Qualification, Qualification)
		)
		AND Q.IsActive = 1
END
GO