CREATE OR ALTER PROCEDURE DeleteCustomer
    @phone INT
AS
BEGIN
    DELETE FROM Customer
    WHERE phone = @phone;
END;

EXEC DeleteCustomer '0123456005'

SELECT * FROM Customer_Order