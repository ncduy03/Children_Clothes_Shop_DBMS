CREATE OR ALTER PROCEDURE AddManufacturer
    @manufacturer_name NVARCHAR(50),
    @phone CHAR(10),
    @address NVARCHAR(50),
    @email NVARCHAR(50)
AS
BEGIN
    INSERT INTO Manufacturer (manufacturer_name, phone, address, email)
    VALUES (@manufacturer_name, @phone, @address, @email);
END;
