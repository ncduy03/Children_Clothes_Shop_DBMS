CREATE OR ALTER PROCEDURE UpdateProduct
    @product_id INT,
    @name NVARCHAR(50),
    @description NVARCHAR(50),
    @inbound_price INT,
    @outbound_price INT,
    @quantity INT,
    @product_category_id INT
AS
BEGIN
    UPDATE Product
    SET name = @name,
        description = @description,
        inbound_price = @inbound_price,
        outboud_price = @outbound_price,
        quantity = @quantity,
        product_category_id = @product_category_id
    WHERE product_id = @product_id;
END;
