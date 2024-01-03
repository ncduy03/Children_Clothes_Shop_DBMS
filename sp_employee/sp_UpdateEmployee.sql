CREATE OR ALTER PROCEDURE UpdateEmployee
    @employee_id INT,
    @name NVARCHAR(50),
    @address NVARCHAR(50),
    @phone CHAR(10),
    @role NVARCHAR(20)
AS
BEGIN
    UPDATE Employee
    SET name = @name,
        address = @address,
        phone = @phone,
        role = @role
    WHERE employee_id = @employee_id;
END;