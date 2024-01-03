CREATE OR ALTER PROCEDURE FindProductsByCategoryName
    @category_name NVARCHAR(50)
AS
BEGIN
    SELECT P.*
    FROM Product P
    INNER JOIN Product_category PC ON P.product_category_id = PC.product_category_id
    WHERE PC.category_name = @category_name;
END;
