CREATE OR ALTER PROCEDURE FindInboundOrdersByTimePeriod
    @start_date DATE = NULL,
    @end_date DATE = NULL
AS
BEGIN
    IF @start_date IS NULL AND @end_date IS NULL
	BEGIN
		SELECT * FROM Inbound_Order
	END;
	ELSE IF @start_date IS NULL AND @end_date IS NOT NULL
	BEGIN
		SELECT * FROM Inbound_Order
		WHERE order_date <= @end_date
	END;
	ELSE IF @start_date IS NOT NULL AND @end_date IS NULL
	BEGIN
		SELECT * FROM Inbound_Order
		WHERE order_date >= @start_date
	END;
	ELSE
	BEGIN
		SELECT * FROM Inbound_Order
		WHERE order_date BETWEEN @start_date AND @end_date
	END;
END;
