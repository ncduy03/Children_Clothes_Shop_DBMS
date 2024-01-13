BULK INSERT Customer_Order_Detail
FROM 'C:\Users\nhhoa\Documents\SQL Server Management Studio\Children Clothes Shop DBMS\customer_order_detail.txt'
WITH
	(
	FIELDTERMINATOR = ',',
	ROWTERMINATOR = '\n',
	CODEPAGE = '65001',
	FIRE_TRIGGERS
	)

DELETE FROM COD
FROM Customer_Order_Detail COD, Customer_Order CO
WHERE COD.customer_order_id = CO.customer_order_id
AND CO.status = N'Đã hủy'