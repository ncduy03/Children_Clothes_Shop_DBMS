CREATE OR ALTER FUNCTION BestEmployee(@start_time DATE = NULL, @end_time DATE = NULL)
RETURNS @table TABLE(
	employee_id INT,
	name NVARCHAR(50),
	sale BIGINT
)
AS 
BEGIN
	IF @start_time IS NOT NULL AND @end_time IS NOT NULL
	BEGIN
		INSERT INTO @table
		SELECT E.employee_id, E.name, SUM(CO.total_price) S
		FROM Employee E, Customer_Order CO
		WHERE E.employee_id = CO.employee_id
		AND CO.order_date BETWEEN @start_time AND @end_time
		AND E.status = N'Đang làm'
		GROUP BY E.employee_id, E.name
		ORDER BY S DESC
	END;
	ELSE IF @start_time IS NOT NULL AND @end_time IS NULL
	BEGIN
		INSERT INTO @table
		SELECT E.employee_id, E.name, SUM(CO.total_price) S
		FROM Employee E, Customer_Order CO
		WHERE E.employee_id = CO.employee_id
		AND CO.order_date >= @start_time
		AND E.status = N'Đang làm'
		GROUP BY E.employee_id, E.name
		ORDER BY S DESC
	END;
	ELSE IF @start_time IS NULL AND @end_time IS NOT NULL
	BEGIN
		INSERT INTO @table
		SELECT E.employee_id, E.name, SUM(CO.total_price) S
		FROM Employee E, Customer_Order CO
		WHERE E.employee_id = CO.employee_id
		AND CO.order_date <= @end_time
		AND E.status = N'Đang làm'
		GROUP BY E.employee_id, E.name
		ORDER BY S DESC
	END;
	ELSE IF @start_time IS NULL AND @end_time IS NULL
	BEGIN
		INSERT INTO @table
		SELECT E.employee_id, E.name, SUM(CO.total_price) S
		FROM Employee E, Customer_Order CO
		WHERE E.employee_id = CO.employee_id
		AND E.status = N'Đang làm'
		GROUP BY E.employee_id, E.name
		ORDER BY S DESC
	END;
	RETURN;
END;
