CREATE PROCEDURE FindEmployeesByName
    @searchName NVARCHAR(50) = NULL
AS
BEGIN
    IF @searchName IS NULL
	BEGIN
		SELECT * FROM Employee
	END;
	ELSE
	BEGIN
		SELECT * FROM Employee
		WHERE name LIKE '%' + @searchName + '%';
	END;
END;
