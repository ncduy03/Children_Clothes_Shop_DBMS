CREATE PROCEDURE FindEmployeesByName
    @searchName NVARCHAR(50)
AS
BEGIN
    SELECT * FROM Employee
    WHERE name LIKE '%' + @searchName + '%';
END;