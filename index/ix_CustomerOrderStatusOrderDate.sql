CREATE NONCLUSTERED INDEX ix_CustomerOrderStatusOrderDate
ON Customer_Order(status, order_date ASC)
INCLUDE(total_price, customer_id)

CREATE NONCLUSTERED INDEX ix_CustomerOrderStatus
ON Customer_Order(status)
INCLUDE(customer_id, order_date, total_price)

CREATE NONCLUSTERED INDEX ix_CustomerOrderOrderDate
ON Customer_Order(order_date ASC)
INCLUDE(customer_id, status, total_price)