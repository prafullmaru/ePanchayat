
create table dbo.Panchayat_Audit_tbl
(
New_PanchayatId int,
New_PanchayatName varchar(50),
New LastModifiedon datetime,
New LastModifiedBy int,
New IsActive bit,
Old_PanchayatId int,
Old_PanchayatName varchar(50),
Old LastModifiedon datetime,
Old_LastModifiedBy int,
Old_IsActive bit,
Activity varchar(100)
)