CREATE OR ALTER TRIGGER CustomerOrderCancelled
ON Customer_Order
FOR UPDATE
AS
BEGIN
	IF UPDATE(status)
	BEGIN
		DELETE FROM COD
        FROM Customer_Order_Detail AS COD
        INNER JOIN inserted AS I ON COD.customer_order_id = I.customer_order_id
        WHERE I.status = N'Đã hủy';
	END;
END;