CREATE OR ALTER TRIGGER UpdateProductQuantity_Insert
ON Customer_Order_Detail
FOR INSERT
AS
BEGIN
	 UPDATE P
	 SET P.quantity = P.quantity - T.S
	 FROM Product P, (SELECT I.product_id, SUM(I.quantity) AS S FROM inserted AS I GROUP BY (I.product_id)) AS T
	 WHERE P.product_id = T.product_id
END;