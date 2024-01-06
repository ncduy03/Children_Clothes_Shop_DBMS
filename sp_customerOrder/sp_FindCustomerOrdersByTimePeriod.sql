CREATE OR ALTER PROCEDURE FindCustomerOrdersByTimePeriod
    @start_date DATE = NULL,
    @end_date DATE = NULL
AS
BEGIN
    IF @start_date IS NULL AND @end_date IS NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, CO.total_price, CO.status
		FROM Customer_Order CO, Customer C
		WHERE CO.customer_id = C.customer_id
	END;
	ELSE IF @start_date IS NULL AND @end_date IS NOT NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, CO.total_price, CO.status
		FROM Customer_Order CO, Customer C
		WHERE CO.customer_id = C.customer_id AND CO.order_date <= @end_date
	END;
	ELSE IF @start_date IS NOT NULL AND @end_date IS NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, CO.total_price, CO.status
		FROM Customer_Order CO, Customer C
		WHERE CO.customer_id = C.customer_id AND CO.order_date >= @start_date
	END;
	ELSE
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, CO.total_price, CO.status
		FROM Customer_Order CO, Customer C
		WHERE CO.customer_id = C.customer_id AND CO.order_date BETWEEN @start_date AND @end_date
	END;
END;
