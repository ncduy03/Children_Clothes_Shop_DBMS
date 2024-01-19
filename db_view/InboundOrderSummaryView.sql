CREATE OR ALTER VIEW InboundOrderSummaryView
AS
SELECT
    IO.inbound_order_id,
    IO.order_date,
    IO.status AS order_status,
    M.manufacturer_name,
    COUNT(IOD.product_id) AS total_products,
    SUM(IOD.quantity * IOD.price) AS total_cost
FROM
    Inbound_Order IO
JOIN
    Inbound_Order_Detail IOD ON IO.inbound_order_id = IOD.inbound_order_id
JOIN
    Manufacturer M ON IO.manufacturer_id = M.manufacturer_id
GROUP BY
    IO.inbound_order_id,
    IO.order_date,
    IO.status,
    M.manufacturer_name;
