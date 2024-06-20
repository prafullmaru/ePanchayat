USE [ePanchayat]
GO

IF OBJECT_ID('dbo.QualificationDelete_sp') IS NOT NULL
BEGIN
	DROP PROCEDURE dbo.QualificationDelete_sp
END
GO

CREATE PROCEDURE dbo.QualificationDelete_sp
(
	@QualificationId INT
)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.Vehicle_tbl WHERE QualificationId = @QualificationId)
	BEGIN
		UPDATE dbo.Qualification_tbl
		SET
			IsActive = 0
		WHERE
			Qualification = @QualificationId
	END
END
GO