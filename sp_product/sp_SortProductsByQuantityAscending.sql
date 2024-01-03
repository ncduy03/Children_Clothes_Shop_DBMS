CREATE OR ALTER PROCEDURE SortProductsByQuantityAscending
AS
BEGIN
    SELECT *
    FROM Product
    ORDER BY quantity ASC;
END;