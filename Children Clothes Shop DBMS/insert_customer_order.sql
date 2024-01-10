BULK INSERT Customer_Order
FROM 'C:\Users\nhhoa\Documents\SQL Server Management Studio\Children Clothes Shop DBMS\customer_order.txt'
WITH
	(
	FIELDTERMINATOR = ',',
	ROWTERMINATOR = '\n',
	CODEPAGE = '65001',
	FIRE_TRIGGERS
	)
