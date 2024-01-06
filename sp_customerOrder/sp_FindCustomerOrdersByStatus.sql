CREATE OR ALTER PROCEDURE FindCustomerOrdersByStatus
    @status NVARCHAR(50) = NULL
AS
BEGIN
    IF @status IS NULL
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, CO.total_price, CO.status
		FROM Customer_Order CO, Customer C
		WHERE CO.customer_id = C.customer_id
	END;
	ELSE
	BEGIN
		SELECT CO.customer_order_id, C.name, CO.order_date, CO.total_price, CO.status
		FROM Customer_Order CO, Customer C
		WHERE status LIKE '%' + @status + '%' AND CO.customer_id = C.customer_id
	END;
END;
