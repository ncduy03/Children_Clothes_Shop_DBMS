CREATE OR ALTER PROCEDURE AddInboundOrder
    @manufacturer_id INT,
    @status NVARCHAR(50)
AS
BEGIN
    INSERT INTO Inbound_Order (manufacturer_id, order_date, status)
    VALUES (@manufacturer_id, CURRENT_TIMESTAMP, @status);
END;
