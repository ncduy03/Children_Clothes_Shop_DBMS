CREATE OR ALTER TRIGGER UpdateProductOnShippedInboundOrder
ON Inbound_Order
AFTER UPDATE
AS
BEGIN
	DECLARE @status NVARCHAR(10)
	SELECT @status = status FROM INSERTED
	IF @status = N'Đã giao'
	BEGIN
		UPDATE P
		SET P.quantity = P.quantity + IOD.quantity
		FROM Product AS P
		JOIN Inbound_Order_Detail AS IOD ON IOD.product_id = P.product_id
		JOIN Inbound_Order AS IO ON IOD.inbound_order_id = IO.inbound_order_id
	END;
END;
