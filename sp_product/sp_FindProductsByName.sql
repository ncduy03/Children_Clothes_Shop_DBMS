CREATE OR ALTER PROCEDURE FindProductByName
    @name NVARCHAR(50) = NULL
AS
BEGIN
    IF @name IS NULL
	BEGIN
		SELECT p.*, pc.category_name FROM Product p JOIN Product_category pc ON p.product_category_id = pc.product_category_id
	END;
	ELSE
	BEGIN
		SELECT p.*, pc.category_name FROM Product p JOIN Product_category pc ON p.product_category_id = pc.product_category_id
		WHERE name LIKE '%' + @name + '%';
	END;
END;
