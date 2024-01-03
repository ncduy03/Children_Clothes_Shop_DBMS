CREATE OR ALTER PROCEDURE FindCustomerOrdersByTimePeriod
    @start_date DATE,
    @end_date DATE
AS
BEGIN
    SELECT * FROM Customer_Order
    WHERE order_date BETWEEN @start_date AND @end_date;
END;
