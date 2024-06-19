USE [ePanchayat]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.Qualification_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Qualification_tbl
END

CREATE TABLE dbo.Qualification_tbl
(
	QualificationId INT IDENTITY(1,1) NOT NULL,
	UserId INT NOT NULL,
	Qualification VARCHAR(50) NOT NULL,
	Major VARCHAR(50) NOT NULL,
	PassingYear INT NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy INT NOT NULL,
	IsActive BIT NOT NULL
)
GO

ALTER TABLE dbo.Qualification_tbl
ADD CONSTRAINT PK_Qualification_QualificationId PRIMARY KEY (QualificationId)
GO

ALTER TABLE dbo.Qualification_tbl
ADD CONSTRAINT FK_Qualification_UserId FOREIGN KEY(UserId) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.Qualification_tbl
ADD CONSTRAINT DF_Qualification_Date DEFAULT GETDATE() FOR LastModifiedOn
GO

ALTER TABLE dbo.Qualification_tbl
ADD CONSTRAINT FK_Qualification_LastModified FOREIGN KEY(LastModifiedBy) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.Qualification_tbl
ADD CONSTRAINT DF_Qualification_IsActive DEFAULT 1 FOR IsActive
GO