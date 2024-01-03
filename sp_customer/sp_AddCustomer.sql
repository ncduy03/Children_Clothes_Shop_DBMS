CREATE OR ALTER PROCEDURE AddCustomer
    @customer_name NVARCHAR(50),
    @phone CHAR(10)
AS
BEGIN
    INSERT INTO Customer (name, phone)
    VALUES (@customer_name, @phone);
END;