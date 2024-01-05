CREATE OR ALTER PROCEDURE FindProductByID
    @product_id INT = NULL
AS
BEGIN
    IF @product_id IS NULL
	BEGIN
		SELECT * FROM Product
	END;
	ELSE
	BEGIN
	SELECT * FROM Product
	WHERE product_id = @product_id
	END;
END;
