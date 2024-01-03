CREATE OR ALTER PROCEDURE AddEmployee
    @name NVARCHAR(50),
    @address NVARCHAR(50),
    @phone CHAR(10),
    @role NVARCHAR(20)
AS
BEGIN
    INSERT INTO Employee (name, address, phone, role)
    VALUES (@name, @address, @phone, @role);
END;


