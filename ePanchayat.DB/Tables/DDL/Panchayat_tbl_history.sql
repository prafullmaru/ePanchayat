IF OBJECT_ID('dbo.Panchayat_tbl_history') IS NOT NULL
BEGIN
	DROP TABLE dbo.Panchayat_tbl_history
END

CREATE TABLE dbo.Panchayat_tbl_history
(
	PanchayatId INT IDENTITY(1,1) NOT NULL,
	PanchayatName VARCHAR(50) NOT NULL,
	LastModifiedOn DATETIME NOT NULL,
	LastModifiedBy INT NOT NULL,
	IsActive BIT NOT NULL
)