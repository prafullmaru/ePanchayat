SELECT 
    t.TABLE_NAME AS `Table Name`,
    t.TABLE_ROWS AS `Number of Rows`,
    ROUND(((t.DATA_LENGTH + t.INDEX_LENGTH) / 1024 / 1024), 2) AS `Table Size (MB)`,
    CASE 
        WHEN tc.CREATE_TIME IS NOT NULL AND DATEDIFF(NOW(), tc.CREATE_TIME) > 0 THEN
            ROUND(t.TABLE_ROWS / DATEDIFF(NOW(), tc.CREATE_TIME), 2)
        ELSE NULL
    END AS `Avg Rows per Day`
FROM 
    dbo.TABLES t
LEFT JOIN 
    dbo.TABLES tc 
    ON t.TABLE_SCHEMA = tc.TABLE_SCHEMA AND t.TABLE_NAME = tc.TABLE_NAME
WHERE 
    t.TABLE_SCHEMA = DATABASE()  -- Optional: Replace with your schema name
ORDER BY 
    t.TABLE_ROWS DESC;

