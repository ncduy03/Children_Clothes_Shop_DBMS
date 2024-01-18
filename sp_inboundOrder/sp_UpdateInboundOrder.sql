CREATE OR ALTER PROCEDURE UpdateInboundOrder
    @inbound_order_id INT,
    @status NVARCHAR(50)
AS
BEGIN
    UPDATE Inbound_Order
    SET status = @status
    WHERE inbound_order_id = @inbound_order_id;
END;
