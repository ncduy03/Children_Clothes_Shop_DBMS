-- No need to update total_price
CREATE OR ALTER PROCEDURE UpdateCustomerOrder
    @customer_order_id INT,
    @customer_id INT,
    @order_date DATE,
    @status NVARCHAR(50),
    @employee_id INT
AS
BEGIN
    UPDATE Customer_Order
    SET customer_id = @customer_id,
        order_date = @order_date,
        status = @status,
        employee_id = @employee_id
    WHERE customer_order_id = @customer_order_id;
END;
