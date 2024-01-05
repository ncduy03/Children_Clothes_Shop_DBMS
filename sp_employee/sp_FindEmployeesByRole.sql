CREATE OR ALTER PROCEDURE FindEmployeesByRole
    @searchRole NVARCHAR(20) = NULL
AS
BEGIN 
    IF @searchRole IS NULL
	BEGIN
		SELECT * FROM Employee
	END;
	ELSE
	BEGIN
		SELECT * FROM Employee
		WHERE role LIKE '%' + @searchRole + '%';
	END;
END;
