CREATE OR ALTER TRIGGER InboundOrderCancelled
ON Inbound_Order
FOR UPDATE
AS
BEGIN
	IF UPDATE(status)
	BEGIN
		DELETE FROM IOD
        FROM Inbound_Order_Detail AS IOD
        INNER JOIN inserted AS I ON IOD.inbound_order_id = I.inbound_order_id
        WHERE I.status = N'Đã hủy';
	END;
END;

UPDATE Inbound_Order 
SET total_price = 0
WHERE status = N'Đã hủy'