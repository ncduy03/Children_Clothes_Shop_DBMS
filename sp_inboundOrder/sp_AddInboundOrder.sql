CREATE OR ALTER PROCEDURE AddInboundOrder
    @manufacturer_id INT,
    @order_date DATE,
    @status NVARCHAR(50)
AS
BEGIN
    INSERT INTO Inbound_Order (manufacturer_id, order_date, status)
    VALUES (@manufacturer_id, @order_date, @status);
END;
