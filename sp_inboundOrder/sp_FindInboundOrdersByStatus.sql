CREATE OR ALTER PROCEDURE FindInboundOrdersByStatus
    @status NVARCHAR(50)
AS
BEGIN
    SELECT * FROM Inbound_Order
    WHERE status = @status;
END;
