CREATE OR ALTER PROCEDURE DeleteEmployee
    @employee_id INT
AS
BEGIN
    DELETE FROM Employee
    WHERE employee_id = @employee_id;
END;
