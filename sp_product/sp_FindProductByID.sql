CREATE OR ALTER PROCEDURE FindProductByID
    @product_id INT
AS
BEGIN
    SELECT * FROM Product
    WHERE product_id = @product_id;
END;
