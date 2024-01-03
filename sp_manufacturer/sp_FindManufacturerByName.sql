CREATE OR ALTER PROCEDURE FindManufacturerByName
    @searchName NVARCHAR(50)
AS
BEGIN
    SELECT * FROM Manufacturer
    WHERE manufacturer_name LIKE '%' + @searchName + '%';
END;
