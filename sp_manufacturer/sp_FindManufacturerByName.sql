CREATE OR ALTER PROCEDURE FindManufacturerByName
    @searchName NVARCHAR(50) = NULL
AS
BEGIN
    IF @searchName IS NULL
	BEGIN
		SELECT * FROM Manufacturer
	END;
	ELSE
	BEGIN
		SELECT * FROM Manufacturer
		WHERE manufacturer_name LIKE '%' + @searchName + '%'
	END;
END;
