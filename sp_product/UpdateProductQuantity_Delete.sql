CREATE OR ALTER TRIGGER UpdateProductQuantity_Delete
ON Customer_Order_Detail
FOR DELETE
AS
BEGIN
	UPDATE P
	SET P.quantity = P.quantity + T.S
	FROM Product P, (SELECT D.product_id, SUM(D.quantity) S FROM deleted D GROUP BY D.product_id) T
	WHERE P.product_id = T.product_id
END;