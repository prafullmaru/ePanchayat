{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww37900\viewh20740\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 IF OBJECT_ID('dbo.Panchayat_tbl_history') IS NOT NULL\
BEGIN\
	DROP TABLE dbo.Panchayat_tbl_history\
END\
\
CREATE TABLE dbo.Panchayat_tbl_history\
(\
	PanchayatId INT IDENTITY(1,1) NOT NULL,\
	PanchayatName VARCHAR(50) NOT NULL,\
	LastModifiedOn DATETIME NOT NULL,\
	LastModifiedBy INT NOT NULL,\
	IsActive BIT NOT NULL\
)}