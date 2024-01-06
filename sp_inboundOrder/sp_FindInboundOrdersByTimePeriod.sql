CREATE OR ALTER PROCEDURE FindInboundOrdersByTimePeriod
    @start_date DATE = NULL,
    @end_date DATE = NULL
AS
BEGIN
    IF @start_date IS NULL AND @end_date IS NULL
	BEGIN
		SELECT IO.inbound_order_id, M.manufacturer_name, IO.order_date, IO.total_price, IO.status
		FROM Inbound_Order IO, Manufacturer M
		WHERE IO.manufacturer_id = M.manufacturer_id
	END;
	ELSE IF @start_date IS NULL AND @end_date IS NOT NULL
	BEGIN
		SELECT IO.inbound_order_id, M.manufacturer_name, IO.order_date, IO.total_price, IO.status
		FROM Inbound_Order IO, Manufacturer M
		WHERE IO.manufacturer_id = M.manufacturer_id AND IO.order_date <= @end_date
	END;
	ELSE IF @start_date IS NOT NULL AND @end_date IS NULL
	BEGIN
		SELECT IO.inbound_order_id, M.manufacturer_name, IO.order_date, IO.total_price, IO.status
		FROM Inbound_Order IO, Manufacturer M
		WHERE IO.manufacturer_id = M.manufacturer_id AND IO.order_date >= @start_date
	END;
	ELSE
	BEGIN
		SELECT IO.inbound_order_id, M.manufacturer_name, IO.order_date, IO.total_price, IO.status
		FROM Inbound_Order IO, Manufacturer M
		WHERE IO.manufacturer_id = M.manufacturer_id AND IO.order_date BETWEEN @start_date AND @end_date
	END;
END;
