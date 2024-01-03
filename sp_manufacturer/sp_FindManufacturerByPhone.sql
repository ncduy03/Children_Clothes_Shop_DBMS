CREATE OR ALTER PROCEDURE FindManufacturerByPhone
    @searchPhone CHAR(10)
AS
BEGIN
    SELECT * FROM Manufacturer
    WHERE phone = @searchPhone;
END;
