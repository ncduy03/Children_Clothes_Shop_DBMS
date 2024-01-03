CREATE OR ALTER PROCEDURE DeleteCustomer
    @customer_id INT
AS
BEGIN
    DELETE FROM Customer
    WHERE customer_id = @customer_id;
END;
