CREATE OR ALTER TRIGGER CheckProductQuantity
ON Customer_Order_Detail
FOR UPDATE, INSERT
AS 
BEGIN
	DECLARE @quantity_cod INT, @quantity_p INT, @product_id INT
	SELECT @quantity_cod = quantity FROM inserted
	SELECT @quantity_p = Product.quantity FROM Product INNER JOIN inserted ON Product.product_id = inserted.product_id
	IF (@quantity_cod > @quantity_p)
	BEGIN
		PRINT 'The quantity of order customer detail is higher than quantity of this product'
		ROLLBACK;
	END;
	ELSE
	BEGIN
		PRINT 'Insert/Update successfully'
	END;
END;
