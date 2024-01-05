CREATE OR ALTER PROCEDURE FindProductsByCategoryName
    @category_name NVARCHAR(50) = NULL
AS
BEGIN
    IF @category_name IS NULL
	BEGIN
		SELECT * FROM Product
	END;
	ELSE
	BEGIN
		SELECT P.*
		FROM Product P
		INNER JOIN Product_category PC ON P.product_category_id = PC.product_category_id
		WHERE PC.category_name LIKE '%' + @category_name + '%';
	END;
END;
