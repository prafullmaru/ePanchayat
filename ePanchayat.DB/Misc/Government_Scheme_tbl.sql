create table dbo.Government_Scheme_tbl
(
Scheme_Id int identity(1,1),
Scheme_Name varchar(2000),
Description varchar(max),
Eligibility int,
Year int,
Sector varchar (200),
Lead_Ministry varchard(100),
UpdateDate datetime
)

go
