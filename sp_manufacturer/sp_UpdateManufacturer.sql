CREATE OR ALTER PROCEDURE UpdateManufacturer
    @manufacturer_id INT,
    @manufacturer_name NVARCHAR(50),
    @phone CHAR(10),
    @address NVARCHAR(50),
    @email NVARCHAR(50)
AS
BEGIN
    UPDATE Manufacturer
    SET manufacturer_name = @manufacturer_name,
        phone = @phone,
        address = @address,
        email = @email
    WHERE manufacturer_id = @manufacturer_id;
END;
