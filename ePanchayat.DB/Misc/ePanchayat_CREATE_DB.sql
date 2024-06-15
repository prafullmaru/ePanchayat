IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ePanchayat')
BEGIN
  CREATE DATABASE ePanchayat;
END;
GO

USE [ePanchayat]
GO