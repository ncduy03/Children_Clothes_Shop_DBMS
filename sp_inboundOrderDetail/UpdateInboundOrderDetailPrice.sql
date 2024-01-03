CREATE TRIGGER UpdateInboundOrderDetailPrice
ON Inbound_Order_Detail
FOR INSERT, UPDATE
AS
BEGIN
    UPDATE iod
    SET iod.price = p.inbound_price * iod.quantity
    FROM Inbound_Order_Detail AS iod
    INNER JOIN Product AS p ON iod.product_id = p.product_id
    INNER JOIN inserted AS i ON iod.inbound_order_id = i.inbound_order_id;

END;
