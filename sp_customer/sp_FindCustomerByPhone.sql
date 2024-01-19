CREATE OR ALTER PROCEDURE FindCustomerByPhone
	@phone CHAR(10)
AS 
BEGIN
	SELECT * FROM Customer
	WHERE phone = @phone
END;