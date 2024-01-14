CREATE OR ALTER PROCEDURE FindProductByName
    @name NVARCHAR(50) = NULL
AS
BEGIN
    IF @name IS NULL
	BEGIN
		SELECT * FROM Product
	END;
	ELSE
	BEGIN
		SELECT *
		FROM Product 
		WHERE name LIKE '%' + @name + '%';
	END;
END;