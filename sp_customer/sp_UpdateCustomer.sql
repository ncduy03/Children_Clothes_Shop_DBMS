CREATE OR ALTER PROCEDURE UpdateCustomer
    @customer_id INT,
    @customer_name NVARCHAR(50),
    @phone CHAR(10)
AS
BEGIN
    UPDATE Customer
    SET name = @customer_name,
        phone = @phone
    WHERE customer_id = @customer_id;
END;
