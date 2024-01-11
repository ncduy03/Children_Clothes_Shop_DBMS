CREATE OR ALTER PROCEDURE FindCustomerOrdersByStatusAndDatetime
    @status NVARCHAR(50) = NULL,
    @start_time DATE = NULL,
    @end_time DATE = NULL
AS
BEGIN
    SELECT CO.customer_order_id, C.name, CO.order_date, CO.total_price, CO.status
    FROM Customer_Order CO
    INNER JOIN Customer C ON CO.customer_id = C.customer_id
    WHERE
        (@status IS NULL OR CO.status = @status) AND
        (@start_time IS NULL OR CO.order_date >= @start_time) AND
        (@end_time IS NULL OR CO.order_date <= @end_time)
	ORDER BY CO.customer_order_id
END;
