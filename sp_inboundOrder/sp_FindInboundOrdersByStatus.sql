CREATE OR ALTER PROCEDURE FindInboundOrdersByStatus
    @status NVARCHAR(50) = NULL
AS
BEGIN
    IF @status IS NULL
	BEGIN
		SELECT * FROM Inbound_Order
	END;
	ELSE
	BEGIN
		SELECT * FROM Inbound_Order
		WHERE status LIKE '%' + @status + '%'
	END;
END;
