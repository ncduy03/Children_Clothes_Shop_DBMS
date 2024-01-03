USE BikeStores;
DROP DATABASE ChildrenShopDBMS;
CREATE DATABASE ChildrenShopDBMS;
USE ChildrenShopDBMS;

CREATE TABLE Product_category(
	product_category_id INT PRIMARY KEY IDENTITY(1,1),
    category_name NVARCHAR(50) NOT NULL
);

CREATE TABLE Product(
	product_id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(50) NOT NULL,
    description NVARCHAR(50) NOT NULL,
	inbound_price INT NOT NULL,
    outbound_price INT NOT NULL,
    quantity INT NOT NULL,
    product_category_id INT NOT NULL,
    FOREIGN KEY(product_category_id) REFERENCES Product_category(product_category_id)
);

CREATE TABLE Customer(
	customer_id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(50) NOT NULL,
    phone CHAR(10) NOT NULL
);

CREATE TABLE Employee(
	employee_id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(50) NOT NULL,
    address NVARCHAR(50) NOT NULL,
    phone CHAR(10) NOT NULL,
	role NVARCHAR(20) NOT NULL
);


CREATE TABLE Customer_Order(
	customer_order_id INT PRIMARY KEY IDENTITY(1,1),
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_price INT,
    status NVARCHAR(50) NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
	FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);


CREATE TABLE Customer_Order_Detail(
	customer_order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
	price INT NOT NULL,
    PRIMARY KEY (customer_order_id, product_id),
	FOREIGN KEY (customer_order_id) REFERENCES Customer_Order(customer_order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE Manufacturer(
	manufacturer_id INT PRIMARY KEY IDENTITY(1,1),
	manufacturer_name NVARCHAR(50) NOT NULL, 
    phone CHAR(10) NOT NULL,
    address NVARCHAR(50),
	email NVARCHAR(50)
);

CREATE TABLE Inbound_Order(
	inbound_order_id INT PRIMARY KEY IDENTITY(1,1),
    manufacturer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_price INT,
    status NVARCHAR(50) NOT NULL,
    FOREIGN KEY (manufacturer_id) REFcreateERENCES Manufacturer(manufacturer_id)
);

CREATE TABLE Inbound_Order_Detail(
	inbound_order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
	price INT NOT NULL,
    PRIMARY KEY (inbound_order_id, product_id),
	FOREIGN KEY (inbound_order_id) REFERENCES Inbound_Order(inbound_order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

USE ChildrenShopDBMS;

INSERT INTO Product_category (category_name) VALUES 
(N'Đồ bộ bé gái'),
(N'Váy đầm bé gái'),
(N'Áo bé gái'),
(N'Đồ bơi bé gái'),
(N'Quần Bé Gái'),
(N'Đồ bộ bé trai'),
(N'Áo Bé Trai'),
(N'Quần bé trai'),
(N'Đồ bơi bé trai');


INSERT INTO Product (name, description, inbound_price, outbound_price, quantity, product_category_id) VALUES 
(N'Đồ bộ hoa hồng bé gái', N'Đồ bộ hoa hồng cho bé gái', 150000, 250000, 50, 1),
(N'Váy đầm dâu tây bé gái', N'Váy đầm dâu tây cho bé gái', 180000, 280000, 40, 2),
(N'Áo thun hình mèo bé gái', N'Áo thun hình mèo cho bé gái', 120000, 220000, 60, 3),
(N'Bộ đồ bơi hình cá bé gái', N'Bộ đồ bơi hình cá cho bé gái', 200000, 300000, 30, 4),
(N'Quần jeans bé gái', N'Quần jeans cho bé gái', 160000, 260000, 35, 5),
(N'Đồ bộ siêu nhân bé trai', N'Đồ bộ siêu nhân cho bé trai', 140000, 240000, 55, 6),
(N'Áo khoác hình xe cứu hỏa bé trai', N'Áo khoác hình xe cứu hỏa cho bé trai', 190000, 290000, 45, 7),
(N'Quần thun bé trai', N'Quần thun cho bé trai', 110000, 210000, 65, 8),
(N'Bộ đồ bơi hình siêu nhân bé trai', N'Bộ đồ bơi hình siêu nhân cho bé trai', 220000, 320000, 25, 9),
(N'Váy đầm hoa bé gái', N'Váy đầm hoa cho bé gái', 170000, 270000, 50, 2),
(N'Áo sơ mi bé gái', N'Áo sơ mi cho bé gái', 130000, 230000, 55, 3),
(N'Bộ đồ bơi hình ngôi sao bé gái', N'Bộ đồ bơi hình ngôi sao cho bé gái', 210000, 310000, 35, 4),
(N'Quần kaki bé gái', N'Quần kaki cho bé gái', 150000, 250000, 40, 5),
(N'Áo thun siêu nhân bé trai', N'Áo thun siêu nhân cho bé trai', 120000, 220000, 60, 6),
(N'Đồ bộ hoạt hình bé trai', N'Đồ bộ hoạt hình cho bé trai', 160000, 260000, 45, 7),
(N'Áo len bé trai', N'Áo len cho bé trai', 100000, 200000, 70, 8),
(N'Bộ đồ bơi hình thú cưng bé trai', N'Bộ đồ bơi hình thú cưng cho bé trai', 230000, 330000, 30, 9),
(N'Váy đầm cầu vồng bé gái', N'Váy đầm cầu vồng cho bé gái', 180000, 280000, 40, 2),
(N'Áo hoodie bé gái', N'Áo hoodie cho bé gái', 140000, 240000, 55, 3),
(N'Quần jean wash bé gái', N'Quần jean wash cho bé gái', 170000, 270000, 50, 5);


INSERT INTO Employee (name, address, phone, role) VALUES 
(N'Trần Thị Ánh', N'123 Đường Hoa, Quận 1, TP.HCM', '0123456781', N'Quản lý'),
(N'Nguyễn Văn An', N'456 Đường Mai, Quận 2, TP.HCM', '0123456782', N'Nhân viên bán hàng'),
(N'Lê Thị Bình', N'789 Đường Sương Mây, Quận 3, TP.HCM', '0123456783', N'Nhân viên bán hàng'),
(N'Phạm Văn Cường', N'101 Đường Nguyễn Chí Thanh, Quận 4, TP.HCM', '0123456784', N'Nhân viên bán hàng'),
(N'Huỳnh Thị Diệu', N'111 Đường Trần Phú, Quận 5, TP.HCM', '0123456785', N'Nhân viên bán hàng'),
(N'Võ Văn Dũng', N'222 Đường Lê Lai, Quận 6, TP.HCM', '0123456786', N'Nhân viên bán hàng'),
(N'Lương Văn Đức', N'333 Đường Nguyễn Văn Linh, Quận 7, TP.HCM', '0123456787', N'Nhân viên kho'),
(N'Nguyễn Thị Hà', N'444 Đường Lê Hồng Phong, Quận 8, TP.HCM', '0123456788', N'Nhân viên kho'),
(N'Trần Văn Hiếu', N'555 Đường Trần Hưng Đạo, Quận 9, TP.HCM', '0123456789', N'Nhân viên bán hàng'),
(N'Hoàng Văn Hùng', N'666 Đường Lý Tự Trọng, Quận 10, TP.HCM', '0123456790', N'Nhân viên bán hàng'),
(N'Đỗ Thị Kim', N'777 Đường Nguyễn Thị Minh Khai, Quận 11, TP.HCM', '0123456791', N'Nhân viên bán hàng'),
(N'Nguyễn Văn Lâm', N'888 Đường Bình Quới, Quận 12, TP.HCM', '0123456792', N'Nhân viên bán hàng'),
(N'Phan Thị Mai', N'999 Đường Tân Kỳ Tân Quý, Quận Tân Phú, TP.HCM', '0123456793', N'Nhân viên bán hàng'),
(N'Trần Văn Nam', N'1212 Đường Nguyễn Văn Quá, Quận Gò Vấp, TP.HCM', '0123456794', N'Nhân viên bán hàng'),
(N'Đặng Văn Phúc', N'1313 Đường Lê Đại Hành, Quận Bình Thạnh, TP.HCM', '0123456795', N'Nhân viên bán hàng'),
(N'Hoàng Thị Quỳnh', N'1414 Đường Nguyễn Kiệm, Quận Phú Nhuận, TP.HCM', '0123456796', N'Nhân viên bán hàng'),
(N'Vũ Thị Sương', N'1515 Đường Lê Văn Sỹ, Quận Tân Bình, TP.HCM', '0123456797', N'Nhân viên bán hàng'),
(N'Lê Văn Tâm', N'1616 Đường Cách Mạng Tháng 8, Quận Thủ Đức, TP.HCM', '0123456798', N'Nhân viên bán hàng'),
(N'Nguyễn Thị Út', N'1717 Đường Đinh Tiên Hoàng, Quận Bình Tân, TP.HCM', '0123456799', N'Nhân viên bán hàng'),
(N'Lê Văn Vượng', N'1818 Đường Hậu Giang, Quận 6, TP.HCM', '0123456800', N'Nhân viên bán hàng');

INSERT INTO Customer (name, phone) VALUES 
(N'Nguyễn Thị An', '0123456001'),
(N'Trần Văn Bình', '0123456002'),
(N'Lê Thị Cẩm', '0123456003'),
(N'Huỳnh Văn Đức', '0123456004'),
(N'Phạm Thị Eo', '0123456005'),
(N'Võ Văn Gia', '0123456006'),
(N'Lương Thị Hà', '0123456007'),
(N'Nguyễn Văn I', '0123456008'),
(N'Trần Thị Kiều', '0123456009'),
(N'Hoàng Văn Lợi', '0123456010'),
(N'Đỗ Thị Mai', '0123456011'),
(N'Nguyễn Văn Nam', '0123456012'),
(N'Phan Văn Oanh', '0123456013'),
(N'Trần Thị Phương', '0123456014'),
(N'Đặng Văn Quân', '0123456015'),
(N'Hoàng Thị Rose', '0123456016'),
(N'Vũ Thị Sương', '0123456017'),
(N'Lê Văn Tâm', '0123456018'),
(N'Nguyễn Thị Út', '0123456019'),
(N'Phạm Văn Vinh', '0123456020');

INSERT INTO Manufacturer (manufacturer_name, phone, address, email) VALUES 
(N'Xưởng may ABC', '0123456701', N'123 Đường ABC, Quận 1, TP.HCM', 'abc@example.com'),
(N'Công ty May XYZ', '0123456702', N'456 Đường XYZ, Quận 2, TP.HCM', 'xyz@example.com'),
(N'Tổng Công ty May Thời Trang A', '0123456703', N'789 Đường A, Quận 3, TP.HCM', 'companyA@example.com'),
(N'Công ty May Thời Trang B', '0123456704', N'101 Đường B, Quận 4, TP.HCM', 'companyB@example.com'),
(N'Xưởng May Chất Lượng Cao', '0123456705', N'111 Đường C, Quận 5, TP.HCM', 'quality@example.com'),
(N'Công ty May Sáng Tạo', '0123456706', N'222 Đường Sáng Tạo, Quận 6, TP.HCM', 'creative@example.com'),
(N'Tổng Công ty May Đẳng Cấp', '0123456707', N'333 Đường Đẳng Cấp, Quận 7, TP.HCM', 'prestige@example.com'),
(N'Xưởng May Đồng Phục Đẹp', '0123456708', N'444 Đường Đẹp, Quận 8, TP.HCM', 'uniform@example.com'),
(N'Công ty May Thời Trang C', '0123456709', N'555 Đường C, Quận 9, TP.HCM', 'companyC@example.com'),
(N'Xưởng May Thời Trang D', '0123456710', N'666 Đường D, Quận 10, TP.HCM', 'companyD@example.com'),
(N'Tổng Công ty May Thời Trang E', '0123456711', N'777 Đường E, Quận 11, TP.HCM', 'companyE@example.com'),
(N'Công ty May Thời Trang F', '0123456712', N'888 Đường F, Quận 12, TP.HCM', 'companyF@example.com'),
(N'Xưởng May Thời Trang G', '0123456713', N'999 Đường G, Quận Gò Vấp, TP.HCM', 'companyG@example.com'),
(N'Công ty May Thời Trang H', '0123456714', N'1010 Đường H, Quận Phú Nhuận, TP.HCM', 'companyH@example.com'),
(N'Tổng Công ty May Thời Trang I', '0123456715', N'1111 Đường I, Quận Tân Bình, TP.HCM', 'companyI@example.com'),
(N'Xưởng May Thời Trang J', '0123456716', N'1212 Đường J, Quận Tân Phú, TP.HCM', 'companyJ@example.com'),
(N'Công ty May Thời Trang K', '0123456717', N'1313 Đường K, Quận Bình Thạnh, TP.HCM', 'companyK@example.com'),
(N'Xưởng May Thời Trang L', '0123456718', N'1414 Đường L, Quận Thủ Đức, TP.HCM', 'companyL@example.com'),
(N'Tổng Công ty May Thời Trang M', '0123456719', N'1515 Đường M, Quận Bình Tân, TP.HCM', 'companyM@example.com'),
(N'Công ty May Thời Trang N', '0123456720', N'1616 Đường N, Quận 7, TP.HCM', 'companyN@example.com');


INSERT INTO Customer_Order (customer_id, order_date, total_price, status, employee_id) VALUES 
(1, '2023-12-01', 720000, N'Đang giao', 1),
(2, '2023-12-02', 840000, N'Đang xử lí', 2),
(3, '2023-12-03', 520000, N'Đang giao', 3),
(4, '2023-12-04', 300000, N'Đã giao', 4);

INSERT INTO Customer_Order_Detail (customer_order_id, product_id, quantity, price) VALUES 
(1, 1, 2, 500000), -- Product: Đồ bộ hoa hồng bé gái
(1, 3, 1, 220000), -- Product: Áo thun hình mèo bé gái
(2, 2, 3, 840000), -- Product: Váy đầm dâu tây bé gái
(3, 5, 2, 520000), -- Product: Quần jeans bé gái
(4, 4, 1, 300000); -- Product: Đồ bơi bé gái


INSERT INTO Inbound_Order (manufacturer_id, order_date, total_price, status) VALUES 
(1, '2023-12-01', 15400000, N'Đang giao'),
(2, '2023-12-02', 10000000, N'Đang xử lí'),
(3, '2023-12-03', 5500000, N'Đang giao'),
(4, '2023-12-04', 5600000, N'Đã giao');

INSERT INTO Inbound_Order_Detail (inbound_order_id, product_id, quantity, price) VALUES 
(1, 1, 50, 10000000), -- Product: Đồ bộ hoa hồng bé gái
(1, 3, 30, 5400000), -- Product: Áo thun hình mèo bé gái
(2, 2, 40, 10000000), -- Product: Váy đầm dâu tây bé gái
(3, 5, 25, 5500000), -- Product: Quần jeans bé gái
(4, 4, 20, 5600000) -- Product: Đồ bơi bé gái
-- Add more rows as needed
;

 