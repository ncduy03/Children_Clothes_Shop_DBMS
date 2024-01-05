CREATE OR ALTER PROCEDURE FindCustomerOrdersByStatus
    @status NVARCHAR(50) = NULL
AS
BEGIN
    IF @status IS NULL
	BEGIN
		SELECT * FROM Customer_Order
	END;
	ELSE
	BEGIN
		SELECT * FROM Customer_Order
		WHERE status LIKE '%' + @status + '%';
	END;
END;
