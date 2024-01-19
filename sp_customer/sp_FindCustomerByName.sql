CREATE OR ALTER PROCEDURE FindCustomerByName
	@name NVARCHAR(50)
AS 
BEGIN
	SELECT * FROM Customer
	WHERE name = @name
END;