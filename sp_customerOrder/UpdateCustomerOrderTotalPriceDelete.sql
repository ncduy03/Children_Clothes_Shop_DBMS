CREATE OR ALTER TRIGGER UpdateOrderTotalPriceDelete
ON Customer_Order_Detail
FOR DELETE
AS
BEGIN
	UPDATE CO
	SET CO.total_price = CASE
		WHEN CO.total_price - T.S < 0 THEN 0
		ELSE CO.total_price - T.S
	END
	FROM Customer_Order CO, (SELECT D.customer_order_id, SUM(D.price) AS S
							FROM deleted D
							GROUP BY D.customer_order_id) AS T
	WHERE CO.customer_order_id = T.customer_order_id
END
