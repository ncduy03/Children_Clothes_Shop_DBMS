CREATE OR ALTER FUNCTION Revenue(@start_date DATE, @end_date DATE)
RETURNS BIGINT
AS
BEGIN
	DECLARE @revenue BIGINT
	IF @start_date IS NOT NULL AND @end_date IS NOT NULL
	BEGIN
		SELECT @revenue = SUM(total_price) FROM Customer_Order WHERE order_date BETWEEN @start_date AND @end_date
	END;
	ELSE IF @start_date IS NOT NULL AND @end_date IS NULL
	BEGIN
		SELECT @revenue = SUM(total_price) FROM Customer_Order WHERE order_date >= @start_date
	END;
	ELSE IF @start_date IS NULL AND @end_date IS NOT NULL
	BEGIN
		SELECT @revenue = SUM(total_price) FROM Customer_Order WHERE order_date <= @end_date
	END;
	ELSE
	BEGIN
		SELECT @revenue = SUM(total_price) FROM Customer_Order
	END;
	RETURN @revenue
END;
