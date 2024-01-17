CREATE OR ALTER FUNCTION BestEmployee(@start_time DATE = NULL, @end_time DATE = NULL)
RETURNS @table TABLE(
    employee_id INT,
    name NVARCHAR(50),
    sale NVARCHAR(50)
)
AS 
BEGIN
    SET @end_time = DATEADD(DAY, 1, @end_time)
    IF @start_time IS NOT NULL AND @end_time IS NOT NULL
    BEGIN
        INSERT INTO @table
        SELECT TOP 5 E.employee_id, E.name, CAST(SUM(CO.total_price) AS NVARCHAR(50)) AS S
        FROM Employee E
        JOIN Customer_Order CO ON E.employee_id = CO.employee_id
        WHERE CO.order_date BETWEEN @start_time AND @end_time
        AND E.status = N'Đang làm'
        GROUP BY E.employee_id, E.name
        ORDER BY S DESC
    END
    ELSE IF @start_time IS NOT NULL AND @end_time IS NULL
    BEGIN
        INSERT INTO @table
        SELECT TOP 5 E.employee_id, E.name, CAST(SUM(CO.total_price) AS NVARCHAR(50)) AS S
        FROM Employee E
        JOIN Customer_Order CO ON E.employee_id = CO.employee_id
        WHERE CO.order_date >= @start_time
        AND E.status = N'Đang làm'
        GROUP BY E.employee_id, E.name
        ORDER BY S DESC
    END
    ELSE IF @start_time IS NULL AND @end_time IS NOT NULL
    BEGIN
        INSERT INTO @table
        SELECT TOP 5 E.employee_id, E.name, CAST(SUM(CO.total_price) AS NVARCHAR(50)) AS S
        FROM Employee E
        JOIN Customer_Order CO ON E.employee_id = CO.employee_id
        WHERE CO.order_date <= @end_time
        AND E.status = N'Đang làm'
        GROUP BY E.employee_id, E.name
        ORDER BY S DESC
    END
    ELSE IF @start_time IS NULL AND @end_time IS NULL
    BEGIN
        INSERT INTO @table
        SELECT TOP 5 E.employee_id, E.name, CAST(SUM(CO.total_price) AS NVARCHAR(50)) AS S
        FROM Employee E
        JOIN Customer_Order CO ON E.employee_id = CO.employee_id
        WHERE E.status = N'Đang làm'
        GROUP BY E.employee_id, E.name
        ORDER BY S DESC
    END

    UPDATE @table
    SET sale = FORMAT(CAST(sale AS BIGINT), 'N0');

    RETURN;
END;