

IF OBJECT_ID (‘dbo. PanchayatTRIGGER’) IS NOT NULL
DROP TRIGGER dbo. PanchayatTRIGGER
GO
Create trigger dbo. PanchayatTRIGGER
   on dbo. Panchayat_tbl
  after UPDATE, INSERT, DELETE

DECLARE @Activity VARCHAR (50)

if exists (SELECT from inserted) and exists (SELECT from deleted)

begin

SET @activity =‘UPDATE’:

INSERT INTO dbo. Panchayat Audit_tbl
(

New_PanchayatId,

New_PanchayatName,

New_LastModifiedon,

New_LastModifiedBy,

New_IsActive,

Old_Panchayatid, 

Old_PanchayatName,

Old_LastModifiedOn,

Old_LastModifiedBy,

Old_IsActive,

ACTIVITY
)

SELECT
i.PanchayatId,
i.PanchayatName,
i.LastModifiedon,
i.LastModifiedBy,
i.IsActive,
d.Panchayatid, 
d.PanchayatName,
d.LastModifiedon,
d.LastModifiedny,
d.lsActive,
@activity ACTIVITY
FROM inserted i inner join deleted d on i.PanchayatId =d.Panchayatid

end

if exists (SELECT from inserted) and  not exists (SELECT from deleted)

begin

SET @activity = ‘INSERT’

INSERT INTO dbo. Panchayat Audit tbl (
	New Panchayat Id,
	New_Panchayat.Name,
	New LastModifiedon,
	New LastModifiedBy,
	New IsActive,
	Activity

	SELECT i. PanchayatId,
	i.PanchayatName,
	i.LastModifiedon,
 	i.LastModifiedBy,
 	i.IsActive,
	@activity
	FROM inserted 1

end

 If exists(select from deleted) and not exists (Select from inserted)
begin
	SET @activity 'DELETE'

	INSERT INTO dbo. Panchayat Audit tbl
        (
	Old Panchayat. Id,
	Old PanchayatName,
	Old LastModifiedon,
	Old LastModifiedBy,
	Old IsActive, 
        Activity
	) 	
      SELECT
	d.Panchayatid,
        d.Panchayatname,
         d.LastModifiedon,
	 d.LastModifiedBy,
       d.IsActive, 
      @activity

FROM deleted

end

