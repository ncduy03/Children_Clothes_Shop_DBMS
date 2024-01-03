CREATE OR ALTER PROCEDURE DeleteManufacturer
    @manufacturer_id INT
AS
BEGIN
    DELETE FROM Manufacturer
    WHERE manufacturer_id = @manufacturer_id;
END;
