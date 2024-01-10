CREATE OR ALTER FUNCTION BestSeller(@start_date DATE, @end_date DATE)
RETURNS TABLE
AS
RETURN (SELECT TOP 10 P.product_id, P.name, SUM(COD.quantity) AS S
		FROM Product P, Customer_Order CO, Customer_Order_Detail COD
		WHERE P.product_id = COD.product_id AND CO.customer_order_id = COD.customer_order_id AND CO.order_date BETWEEN @start_date AND @end_date
		GROUP BY P.product_id, P.name
		ORDER BY S DESC);
