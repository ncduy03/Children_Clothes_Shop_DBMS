CREATE OR ALTER PROCEDURE DeleteEmployee
    @phone char(10)
AS
BEGIN
    UPDATE Employee
	SET status = N'Đã nghỉ'
	WHERE phone = @phone
END;
