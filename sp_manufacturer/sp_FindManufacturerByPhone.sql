CREATE OR ALTER PROCEDURE FindManufacturerByPhone
    @searchPhone CHAR(10) = NULL
AS
BEGIN
    IF @searchPhone IS NULL
	BEGIN
		SELECT * FROM Manufacturer
	END;
	ELSE
	BEGIN
		SELECT * FROM Manufacturer
		WHERE phone LIKE '%' + @searchPhone + '%'
	END;
END;
