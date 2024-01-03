CREATE TRIGGER UpdateInboundOrderTotalPrice
ON Inbound_Order_Detail
FOR INSERT, UPDATE, DELETE
AS
BEGIN

    DECLARE @orderID INT;
    SELECT @orderID = inbound_order_id FROM inserted;

    UPDATE Inbound_Order
    SET total_price = (
        SELECT SUM(p.inbound_price * iod.quantity)
        FROM Inbound_Order_Detail AS iod
        INNER JOIN Product AS p ON iod.product_id = p.product_id
        WHERE iod.inbound_order_id = @orderID
    )
    WHERE inbound_order_id = @orderID;

END;
