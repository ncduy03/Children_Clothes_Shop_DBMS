CREATE OR ALTER TRIGGER UpdateInboundOrderTotalPriceDelete
ON Inbound_Order_Detail
FOR DELETE
AS
BEGIN
	UPDATE IO
	SET IO.total_price = CASE
		WHEN IO.total_price - T.S < 0 THEN 0
		ELSE IO.total_price - T.S
	END
	FROM Inbound_Order IO, (SELECT D.inbound_order_id, SUM(D.price) AS S
							FROM deleted D
							GROUP BY D.inbound_order_id) AS T
	WHERE IO.inbound_order_id = T.inbound_order_id
END;