USE [ePanchayat]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.Panchayat_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Panchayat_tbl
END

IF OBJECT_ID('dbo.Vehicle_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Vehicle_tbl
END

IF OBJECT_ID('dbo.Qualification_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Qualification_tbl
END

IF OBJECT_ID('dbo.House_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.House_tbl
END

IF OBJECT_ID('dbo.Event_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Event_tbl
END

IF OBJECT_ID('dbo.Announcement_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Announcement_tbl
END

IF OBJECT_ID('dbo.Complaint_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Complaint_tbl
END

IF OBJECT_ID('dbo.Ledger_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.Ledger_tbl
END

IF OBJECT_ID('dbo.UserRoleAccess_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.UserRoleAccess_tbl
END

IF OBJECT_ID('dbo.UserRole_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.UserRole_tbl
END

IF OBJECT_ID('dbo.User_tbl') IS NOT NULL
BEGIN
	DROP TABLE dbo.User_tbl
END