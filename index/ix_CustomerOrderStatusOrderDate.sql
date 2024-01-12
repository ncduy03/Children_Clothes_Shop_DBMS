CREATE INDEX ix_CustomerOrderStatusOrderDate
ON Customer_Order(status, order_date)
INCLUDE(customer_id, total_price)
