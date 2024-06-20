-- TODO - Finalize fields and prepare CRUD stored procs

USE [ePanchayat]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.Ledger_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Ledger_tbl
END

CREATE TABLE dbo.Ledger_tbl
(
	LedgerId INT IDENTITY(1,1) NOT NULL,
	TransactionTypeId INT NOT NULL,
	Amount FLOAT NOT NULL,
	Description VARCHAR(500) NOT NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy INT NOT NULL,
	IsActive BIT NOT NULL
)
GO

ALTER TABLE dbo.Ledger_tbl
ADD CONSTRAINT PK_Ledger_LedgerId PRIMARY KEY (LedgerId)
GO

ALTER TABLE dbo.Ledger_tbl
ADD CONSTRAINT DF_Ledger_Date DEFAULT GETDATE() FOR LastModifiedOn
GO

ALTER TABLE dbo.Ledger_tbl
ADD CONSTRAINT FK_Ledger_LastModified FOREIGN KEY(LastModifiedBy) REFERENCES dbo.User_tbl(UserId)
GO

ALTER TABLE dbo.Ledger_tbl
ADD CONSTRAINT DF_Ledger_IsActive DEFAULT 1 FOR IsActive
GO