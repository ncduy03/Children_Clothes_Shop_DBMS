CREATE OR ALTER TRIGGER UpdateProductQuantity_Update
ON Customer_Order_Detail
FOR UPDATE
AS
BEGIN
	UPDATE P
	SET P.quantity = P.quantity + T1.S1 - T2.S2
	FROM Product P, (SELECT I.product_id, SUM(I.quantity) AS S1 FROM inserted I GROUP BY I.product_id) T1,
		(SELECT D.product_id, SUM(D.quantity) AS S2 FROM deleted D GROUP BY D.product_id) T2
	WHERE P.product_id = T1.product_id AND P.product_category_id  = T2.product_id
END;