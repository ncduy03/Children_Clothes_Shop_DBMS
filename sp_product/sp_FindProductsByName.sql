CREATE OR ALTER PROCEDURE FindProductsByName
    @product_name NVARCHAR(50)
AS
BEGIN
    SELECT * FROM Product
    WHERE name = @product_name;
END;
