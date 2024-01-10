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
	inbound_price BIGINT NOT NULL,
    outbound_price BIGINT NOT NULL,
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
    order_date DATETIME NOT NULL,
    total_price BIGINT DEFAULT 0,
    status NVARCHAR(50) NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
	FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);


CREATE TABLE Customer_Order_Detail(
	customer_order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
	price BIGINT DEFAULT 0,
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
    order_date DATETIME NOT NULL,
    total_price BIGINT DEFAULT 0,
    status NVARCHAR(50) NOT NULL,
    FOREIGN KEY (manufacturer_id) REFERENCES Manufacturer(manufacturer_id)
);

CREATE TABLE Inbound_Order_Detail(
	inbound_order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
	price BIGINT DEFAULT 0,
    PRIMARY KEY (inbound_order_id, product_id),
	FOREIGN KEY (inbound_order_id) REFERENCES Inbound_Order(inbound_order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
