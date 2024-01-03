CREATE OR ALTER PROCEDURE DeleteProduct
    @product_id INT
AS
BEGIN
    DELETE FROM Product
    WHERE product_id = @product_id;
END;
