CREATE OR ALTER FUNCTION BestSeller(@start_date DATE, @end_date DATE)
RETURNS @table TABLE(
	product_id INT,
	name NVARCHAR(50),
	quantity INT
)
AS
BEGIN
	SET @end_date = DATEADD(DAY, 1, @end_date)
	IF @start_date IS NOT NULL AND @end_date IS NOT NULL
	BEGIN
		INSERT INTO @table
		SELECT TOP 10 P.product_id, P.name, SUM(COD.quantity) AS S
		FROM Product P, Customer_Order CO, Customer_Order_Detail COD
		WHERE P.product_id = COD.product_id AND CO.customer_order_id = COD.customer_order_id AND CO.order_date BETWEEN @start_date AND @end_date
		GROUP BY P.product_id, P.name
		ORDER BY S DESC
	END;
	ELSE IF @start_date IS NOT NULL AND @end_date IS NULL
	BEGIN
		INSERT INTO @table
		SELECT TOP 10 P.product_id, P.name, SUM(COD.quantity) AS S
		FROM Product P, Customer_Order CO, Customer_Order_Detail COD
		WHERE P.product_id = COD.product_id AND CO.customer_order_id = COD.customer_order_id AND CO.order_date>= @start_date
		GROUP BY P.product_id, P.name
		ORDER BY S DESC
	END;
	ELSE IF @start_date IS NULL AND @end_date IS NOT NULL
	BEGIN
		INSERT INTO @table
		SELECT TOP 10 P.product_id, P.name, SUM(COD.quantity) AS S
		FROM Product P, Customer_Order CO, Customer_Order_Detail COD
		WHERE P.product_id = COD.product_id AND CO.customer_order_id = COD.customer_order_id AND CO.order_date <= @end_date
		GROUP BY P.product_id, P.name
		ORDER BY S DESC
	END;
	ELSE
	BEGIN
		INSERT INTO @table
		SELECT TOP 10 P.product_id, P.name, SUM(COD.quantity) AS S
		FROM Product P, Customer_Order CO, Customer_Order_Detail COD
		WHERE P.product_id = COD.product_id AND CO.customer_order_id = COD.customer_order_id
		GROUP BY P.product_id, P.name
		ORDER BY S DESC
	END;
	RETURN;
END;
	


