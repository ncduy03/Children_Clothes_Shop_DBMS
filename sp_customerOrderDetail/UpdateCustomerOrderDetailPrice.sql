CREATE TRIGGER UpdateOrderDetailPrice
ON Customer_Order_Detail
FOR UPDATE, INSERT
AS
BEGIN
UPDATE cod
SET cod.price = p.outbound_price * cod.quantity
FROM Customer_Order_Detail AS cod
INNER JOIN Product AS p ON cod.product_id = p.product_id
INNER JOIN inserted AS I ON cod.customer_order_id = i.customer_order_id
END;

