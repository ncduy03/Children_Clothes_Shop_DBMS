CREATE OR ALTER PROCEDURE FindCustomerOrdersByStatusAndDatetime
    @status NVARCHAR(50) = NULL,
    @start_time DATE = NULL,
    @end_time DATE = NULL
AS
BEGIN
    IF @status IS NOT NULL AND @start_time IS NOT NULL AND @end_time IS NOT NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, FORMAT(CO.total_price, 'N0') AS TP, CO.status
		FROM Customer_Order CO
		INNER JOIN Customer C ON CO.customer_id = C.customer_id
		WHERE status = @status AND order_date BETWEEN @start_time AND DATEADD(DAY, 2, @end_time)
		ORDER BY CO.order_date DESC
	END;
	ELSE IF @status IS NOT NULL AND @start_time IS NULL AND @end_time IS NOT NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, FORMAT(CO.total_price, 'N0') AS TP, CO.status
		FROM Customer_Order CO
		INNER JOIN Customer C ON CO.customer_id = C.customer_id
		WHERE status = @status AND order_date <= DATEADD(DAY, 2, @end_time)
		ORDER BY CO.order_date DESC
	END;
	ELSE IF @status IS NOT NULL AND @start_time IS NOT NULL AND @end_time IS NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, FORMAT(CO.total_price, 'N0') AS TP, CO.status
		FROM Customer_Order CO
		INNER JOIN Customer C ON CO.customer_id = C.customer_id
		WHERE
			status = @status AND order_date >= @start_time
		ORDER BY CO.order_date DESC
	END;
	ELSE IF @status IS NOT NULL AND @start_time IS NULL AND @end_time IS NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, FORMAT(CO.total_price, 'N0') AS TP, CO.status
		FROM Customer_Order CO
		INNER JOIN Customer C ON CO.customer_id = C.customer_id
		WHERE
			status = @status
		ORDER BY CO.order_date DESC
	END;
	ELSE IF @status IS NULL AND @start_time IS NOT NULL AND @end_time IS NOT NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, FORMAT(CO.total_price, 'N0') AS TP, CO.status
		FROM Customer_Order CO
		INNER JOIN Customer C ON CO.customer_id = C.customer_id
		WHERE
			order_date BETWEEN @start_time AND DATEADD(DAY, 2, @end_time)
		ORDER BY CO.order_date DESC
	END;
	ELSE IF @status IS NULL AND @start_time IS NULL AND @end_time IS NOT NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, FORMAT(CO.total_price, 'N0') AS TP, CO.status
		FROM Customer_Order CO
		INNER JOIN Customer C ON CO.customer_id = C.customer_id
		WHERE
			order_date <= DATEADD(DAY, 2, @end_time)
		ORDER BY CO.order_date DESC
	END;
	ELSE IF @status IS NULL AND @start_time IS NOT NULL AND @end_time IS NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, FORMAT(CO.total_price, 'N0') AS TP, CO.status
		FROM Customer_Order CO
		INNER JOIN Customer C ON CO.customer_id = C.customer_id
		WHERE
			order_date >= @start_time
		ORDER BY CO.order_date DESC
	END;
	ELSE IF @status IS NULL AND @start_time IS NULL AND @end_time IS NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, FORMAT(CO.total_price, 'N0') AS TP, CO.status
		FROM Customer_Order CO
		INNER JOIN Customer C ON CO.customer_id = C.customer_id
		ORDER BY CO.order_date DESC
	END;
END;