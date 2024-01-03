CREATE OR ALTER PROCEDURE FindCustomerOrdersByStatus
    @status NVARCHAR(50)
AS
BEGIN
    SELECT * FROM Customer_Order
    WHERE status = @status;
END;
