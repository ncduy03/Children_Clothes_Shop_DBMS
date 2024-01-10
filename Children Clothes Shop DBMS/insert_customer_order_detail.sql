BULK INSERT Customer_Order_Detail
FROM 'C:\Users\nhhoa\Documents\SQL Server Management Studio\Children Clothes Shop DBMS\customer_order_detail.txt'
WITH
	(
	FIELDTERMINATOR = ',',
	ROWTERMINATOR = '\n',
	CODEPAGE = '65001',
	FIRE_TRIGGERS
	)
