-- No need to update total_price
CREATE OR ALTER PROCEDURE UpdateCustomerOrder
    @customer_order_id INT,
    @status NVARCHAR(50)
AS
BEGIN
    UPDATE Customer_Order
    SET status = @status
    WHERE customer_order_id = @customer_order_id;
END;


