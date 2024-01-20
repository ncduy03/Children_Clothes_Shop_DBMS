-- Create login for manager and employee
EXEC sp_addlogin 'manager', 'manager', 'ChildrenShopDBMS';
EXEC sp_addlogin 'employee', 'employee', 'ChildrenShopDBMS';

-- Create role for employees with restricted access
CREATE ROLE EmployeeRole;

-- Create a user for the login employees
CREATE USER employee
FOR LOGIN employee

-- Grant insert, update, delete permissions on Customer_Order and Customer_Order_Detail tables
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.Customer_Order TO EmployeeRole;
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.Customer_Order_Detail TO EmployeeRole;
GRANT SELECT, INSERT, UPDATE ON dbo.Customer TO EmployeeRole;
GRANT CONNECT ON DATABASE::ChildrenShopDBMS TO EmployeeRole;
GRANT SELECT ON dbo.Employee TO EmployeeRole

-- Add employee user to EmployeeRole
ALTER ROLE EmployeeRole ADD MEMBER employee

-- Create role for managers with full access
CREATE ROLE ManagerRole;

-- Create a user for the login managers
CREATE USER manager
FOR LOGIN manager


-- Grant full access to all tables in the database for managers
GRANT SELECT, INSERT, UPDATE, DELETE ON DATABASE::ChildrenShopDBMS TO ManagerRole;
GRANT CONNECT ON DATABASE::ChildrenShopDBMS TO ManagerRole;


-- Add manager user to ManagerRole
ALTER ROLE ManagerRole ADD MEMBER manager;




