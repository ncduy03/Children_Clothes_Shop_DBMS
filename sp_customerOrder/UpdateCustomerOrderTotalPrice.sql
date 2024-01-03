CREATE TRIGGER UpdateOrderTotalPrice
ON Customer_Order_Detail
FOR INSERT, UPDATE, DELETE
AS
BEGIN

    DECLARE @orderID INT;
    SELECT @orderID = customer_order_id FROM inserted;

    UPDATE Customer_Order
    SET total_price = (
        SELECT SUM(p.outbound_price * cod.quantity)
        FROM Customer_Order_Detail AS cod
        INNER JOIN Product AS p ON cod.product_id = p.product_id
        WHERE cod.customer_order_id = @orderID
    )
    WHERE customer_order_id = @orderID;

END;
