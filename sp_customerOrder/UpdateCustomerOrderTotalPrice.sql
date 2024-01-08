CREATE OR ALTER TRIGGER UpdateOrderTotalPrice
ON Customer_Order_Detail
FOR INSERT, UPDATE
AS
BEGIN
    UPDATE CO
    SET CO.total_price = T.S
	FROM Customer_Order CO, (SELECT COD.customer_order_id ,SUM(COD.price) as S
								FROM Customer_Order_Detail COD, (SELECT DISTINCT(customer_order_id) FROM inserted) AS I
								WHERE I.customer_order_id = COD.customer_order_id
								GROUP BY COD.customer_order_id) AS T
	WHERE CO.customer_order_id = T.customer_order_id
END;
