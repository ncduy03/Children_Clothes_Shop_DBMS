CREATE OR ALTER TRIGGER UpdateOrderTotalPrice
ON Customer_Order_Detail
FOR INSERT, UPDATE, DELETE
AS
BEGIN
    UPDATE CO
    SET CO.total_price = S 
	FROM Customer_Order CO, (SELECT COD.customer_order_id ,SUM(COD.price) as S
						FROM Customer_Order_Detail COD, inserted I
						WHERE COD.customer_order_id = I.customer_order_id
						GROUP BY COD.customer_order_id) AS T
	WHERE CO.customer_order_id = T.customer_order_id
END;
