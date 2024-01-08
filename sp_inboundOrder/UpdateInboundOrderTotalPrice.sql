CREATE OR ALTER TRIGGER UpdateInboundOrderTotalPrice
ON Inbound_Order_Detail
FOR INSERT, UPDATE
AS
BEGIN
    UPDATE IO
	SET IO.total_price = T.S
	FROM Inbound_Order IO, (SELECT IOD.inbound_order_id, SUM(IOD.price) AS S
							FROM Inbound_Order_Detail IOD, (SELECT DISTINCT(inbound_order_id) FROM inserted) AS I
							WHERE I.inbound_order_id = IOD.inbound_order_id
							GROUP BY IOD.inbound_order_id) AS T
	WHERE IO.inbound_order_id = T.inbound_order_id
END;
