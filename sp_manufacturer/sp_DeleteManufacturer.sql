CREATE OR ALTER PROCEDURE DeleteManufacturer
    @phone INT
AS
BEGIN
    DELETE FROM Manufacturer
    WHERE phone = @phone;
END;

EXEC DeleteManufacturer '0123456703'
