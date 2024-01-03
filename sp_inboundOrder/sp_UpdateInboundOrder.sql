CREATE OR ALTER PROCEDURE UpdateInboundOrder
    @inbound_order_id INT,
    @manufacturer_id INT,
    @order_date DATE,
    @status NVARCHAR(50)
AS
BEGIN
    UPDATE Inbound_Order
    SET manufacturer_id = @manufacturer_id,
        order_date = @order_date,
        status = @status
    WHERE inbound_order_id = @inbound_order_id;
END;
