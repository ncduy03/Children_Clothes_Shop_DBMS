CREATE OR ALTER PROCEDURE FindInboundOrdersByTimePeriod
    @start_date DATE,
    @end_date DATE
AS
BEGIN
    SELECT * FROM Inbound_Order
    WHERE order_date BETWEEN @start_date AND @end_date;
END;
