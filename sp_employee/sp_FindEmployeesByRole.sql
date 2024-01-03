CREATE OR ALTER PROCEDURE FindEmployeesByRole
    @searchRole NVARCHAR(20)
AS
BEGIN 
    SELECT * FROM Employee
    WHERE role LIKE '%' + @searchRole + '%';
END;
