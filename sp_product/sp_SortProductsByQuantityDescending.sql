CREATE OR ALTER PROCEDURE SortProductsByQuantityDescending
AS
BEGIN
    SELECT *
    FROM Product
    ORDER BY quantity DESC;
END;
