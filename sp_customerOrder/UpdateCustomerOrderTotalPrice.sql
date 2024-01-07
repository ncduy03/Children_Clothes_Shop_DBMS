CREATE OR ALTER TRIGGER UpdateOrderTotalPrice
ON Customer_Order_Detail
FOR INSERT, UPDATE
AS
BEGIN
    UPDATE CO
    SET CO.total_price = T.S + CO.total_price
	FROM Customer_Order CO, (SELECT I.customer_order_id ,SUM(I.price) as S
								FROM inserted I
								GROUP BY I.customer_order_id) AS T
	WHERE CO.customer_order_id = T.customer_order_id
END;
