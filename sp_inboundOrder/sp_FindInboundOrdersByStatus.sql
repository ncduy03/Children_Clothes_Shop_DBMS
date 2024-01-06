CREATE OR ALTER PROCEDURE FindInboundOrdersByStatus
    @status NVARCHAR(50) = NULL
AS
BEGIN
    IF @status IS NULL
	BEGIN
		SELECT IO.inbound_order_id, M.manufacturer_name, IO.order_date, IO.total_price, IO.status
		FROM Inbound_Order IO, Manufacturer M
		WHERE IO.manufacturer_id = M.manufacturer_id
	END;
	ELSE
	BEGIN
		SELECT IO.inbound_order_id, M.manufacturer_name, IO.order_date, IO.total_price, IO.status
		FROM Inbound_Order IO, Manufacturer M
		WHERE IO.manufacturer_id = M.manufacturer_id AND STATUS LIKE '%' + @status + '%'
	END;
END;
