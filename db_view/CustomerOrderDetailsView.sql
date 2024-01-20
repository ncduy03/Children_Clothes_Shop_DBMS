CREATE OR ALTER VIEW CustomerOrderDetailsView
AS
SELECT
    COD.customer_order_id,
    COD.product_id,
    P.name AS product_name,
    COD.quantity,
    FORMAT(COD.price, 'N0') AS price,
    CO.order_date,
    CO.status AS order_status,
    C.name AS customer_name
FROM
    Customer_Order_Detail COD
JOIN
    Customer_Order CO ON COD.customer_order_id = CO.customer_order_id
JOIN
    Product P ON COD.product_id = P.product_id
JOIN
    Customer C ON CO.customer_id = C.customer_id;