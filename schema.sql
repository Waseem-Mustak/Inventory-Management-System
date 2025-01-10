-- This file contains the Schema for a Inventory Management System, 
-- including some tables like Owner_Info, Company_Info, User_Info, 
-- Branch_Info, Manager_Info, Employee_Info, Customer_Info, Product_Category, 
-- Product_Info, Order_Details, Sell_Info, Buy_Order, Buy_Info, Supplier_Info.

CREATE TABLE Owner_Info(
Owner_Id NUMBER NOT NULL,
Company_Id NUMBER NOT NULL,
Owner_Name VARCHAR2(20) NOT NULL,
PRIMARY KEY(Owner_Id)
-- FOREIGN KEY(Company_Id) REFERENCES User_Info(Company_Id)
--  user_name VARCHAR2(10) NOT NULL,
--  password VARCHAR2(10) NOT NULL,
--  PRIMARY KEY(user_name)
);

-- INSERT INTO Owner_Info VALUES(1,1,'Ambani');

CREATE TABLE Company_Info(
Company_Id NUMBER NOT NULL,
Owner_Id NUMBER NOT NULL,
Company_Name VARCHAR2(20) NOT NULL,
PRIMARY KEY(Company_Id),
FOREIGN KEY(Owner_Id) REFERENCES Owner_Info(Owner_Id)
--  user_name VARCHAR2(10) NOT NULL,
--  password VARCHAR2(10) NOT NULL,
--  PRIMARY KEY(user_name)
);

CREATE TABLE User_Info(
User_Id VARCHAR2(10) NOT NULL,
User_Type VARCHAR2(10) NOT NULL,
Company_Id NUMBER,
Password VARCHAR2(8) NOT NULL,
PRIMARY KEY(User_Id),
FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id)
--  user_name VARCHAR2(10) NOT NULL,
--  password VARCHAR2(10) NOT NULL,
--  PRIMARY KEY(user_name)
);


--SELECT * FROM user_info;
-- INSERT INTO Owner_Info VALUES(1,1,'Ambani');
CREATE TABLE Branch_Info( 
Branch_Id NUMBER NOT NULL,
Company_Id NUMBER not NULL,
Manager_Id VARCHAR2(10),
Location_Name VARCHAR2(12),
PRIMARY KEY(Branch_Id),
FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
FOREIGN KEY(Manager_Id) REFERENCES User_Info(User_Id)
);
-- SELECT * from Branch_Info;

CREATE TABLE Manager_Info(
Manager_Id VARCHAR2(10) not NULL, 
Branch_Id NUMBER ,
Company_Id NUMBER,
Manager_Name VARCHAR2(12),
Salary NUMBER,
PRIMARY KEY(Manager_Id),
FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id)
);


CREATE TABLE Employee_Info(
Employee_Id VARCHAR2(10) not NULL, 
Branch_Id NUMBER ,
Company_Id NUMBER,
Employee_Name VARCHAR2(12),
Salary NUMBER,
PRIMARY KEY(Employee_Id),
FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id)
);

CREATE TABLE Customer_Info(
Customer_Id VARCHAR2(10) not NULL, 
Branch_Id NUMBER ,
Company_Id NUMBER,
Customer_Name VARCHAR2(12),
PRIMARY KEY(Customer_Id),
FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id)
);

-- CREATE TABLE Product_Category(
-- 
-- Category_Id VARCHAR2(10) not NULL, 
-- Branch_Id NUMBER ,
-- Company_Id NUMBER,
-- PRIMARY KEY(Category_Id),
-- FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
-- FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id)
-- );

CREATE TABLE Product_Category(

Category_Id VARCHAR2(10) not NULL, 
Branch_Id NUMBER ,
Company_Id NUMBER,
PRIMARY KEY(Category_Id,BRANCH_ID,COMPANY_ID),
FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id)
);
-- INSERT INTO tem_Product_Category VALUES('k',1,1)
-- INSERT INTO tem_Product_Category VALUES('k',2,1)
-- SELECT * FROM tem_Product_Category

CREATE TABLE Product_Info(

Product_Id VARCHAR2(10) not NULL, 
Branch_Id NUMBER ,
Company_Id NUMBER,
Category_Id VARCHAR2(10),
Supplier_Id VARCHAR2(10),
Unit_Price NUMBER,
Quantity NUMBER,
Color VARCHAR2(10),
Product_Size VARCHAR2(10),
Discount NUMBER,

PRIMARY KEY(Product_Id,Branch_Id,Company_Id),
FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id),

FOREIGN KEY(Supplier_Id) REFERENCES User_Info(User_Id)
);


CREATE TABLE Order_Details(
Order_Id NUMBER,
Customer_Id VARCHAR2(10),
Product_Id VARCHAR2(10), 
Branch_Id NUMBER ,
Company_Id NUMBER,
Category_Id VARCHAR2(10),

Order_Date DATE,
Order_Quantity NUMBER,
Payment_Method VARCHAR2(10),
Product_Status VARCHAR2(10),


PRIMARY KEY(Order_Id),
FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id),

FOREIGN KEY(Customer_Id) REFERENCES Customer_Info(Customer_Id)

);

CREATE TABLE Sell_Info(
Order_Id NUMBER,
Product_Id VARCHAR2(10), 
Branch_Id NUMBER ,
Company_Id NUMBER,
Category_Id VARCHAR2(10),

Sell_Date DATE,
Sell_Quantity NUMBER,
Payment_Method VARCHAR2(10),


PRIMARY KEY(Order_Id),
FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id)
);

CREATE TABLE Buy_Order(
Buy_Order_Id NUMBER,
Product_Id VARCHAR2(10), 
Manager_Id VARCHAR2(10),
Category_Id VARCHAR2(10),

Buy_Order_Date DATE,
Buy_Quantity NUMBER,


PRIMARY KEY(Buy_Order_Id),

FOREIGN KEY(Manager_Id) REFERENCES Manager_Info(Manager_Id)

);

CREATE TABLE Buy_Info(
Buy_Order_Id NUMBER,
Supplier_Id VARCHAR2(10),
Product_Id VARCHAR2(10), 
Category_Id VARCHAR2(10),
Buy_Quantity NUMBER,

Supply_Date DATE,
Supply_Price NUMBER,
Contact_Info NUMBER,
Payment_Method VARCHAR2(10),


PRIMARY KEY(Buy_Order_Id),

FOREIGN KEY(Supplier_Id) REFERENCES User_Info(User_Id)

);


CREATE TABLE Supplier_Info(
Supplier_Id VARCHAR2(10) not NULL, 
Company_Id NUMBER,
Supplier_Name VARCHAR2(10),
Contact_Number NUMBER,
PRIMARY KEY(Supplier_Id),
FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id)
);



-- CREATE OR REPLACE FUNCTION GET_MAX_BUY_ORDER_ID
-- RETURN NUMBER IS
--  num1 NUMBER ;
--  num2 NUMBER ;
--  maxnum NUMBER;
-- BEGIN
-- 	SELECT NVL(MAX(buy_order_id),0) INTO num1 FROM BUY_ORDER;
-- 	SELECT NVL(MAX(buy_order_id),0) INTO num2 FROM BUY_INFO;

-- 	IF num1 >= num2 THEN 
-- 	maxnum := num1 ;
-- 	ELSE
-- 	maxnum := num2;
-- 	END IF ;
-- 	RETURN maxnum ;
-- END ;
-- /

-- -- SELECT * FROM ORDER_DETAILS
-- -- SELECT * FROM SELL_INFO

-- CREATE OR REPLACE FUNCTION GET_MAX_ORDER_ID
-- RETURN NUMBER IS
--  num1 NUMBER ;
--  num2 NUMBER ;
--  maxnum NUMBER;
-- BEGIN
-- 	SELECT NVL(MAX(order_id),0) INTO num1 FROM ORDER_DETAILS;
-- 	SELECT NVL(MAX(order_id),0) INTO num2 FROM SELL_INFO;

-- 	IF num1 >= num2 THEN 
-- 	maxnum := num1 ;
-- 	ELSE
-- 	maxnum := num2;
-- 	END IF ;
-- 	RETURN maxnum ;
-- END ;
-- /



-- CREATE OR REPLACE TRIGGER Order_Delivered 
-- AFTER INSERT ON SELL_INFO 
-- FOR EACH ROW
-- DECLARE
--     MESSAGE VARCHAR2(100);
-- BEGIN
--     -- Fetch the PRODUCT_STATUS from ORDER_DETAILS for the corresponding ORDER_ID
--     SELECT PRODUCT_STATUS INTO MESSAGE
--     FROM ORDER_DETAILS
--     WHERE ORDER_ID = :NEW.ORDER_ID;

--     -- Check if the PRODUCT_STATUS is 'Received'
--     IF MESSAGE = 'Received' THEN
--         -- Update the PRODUCT_STATUS to 'Delivered' in ORDER_DETAILS
--         UPDATE ORDER_DETAILS 
-- 				SET ORDER_QUANTITY=0,PRODUCT_STATUS='Delivered' 
-- 				WHERE ORDER_ID= :NEW.ORDER_ID;
--     END IF;
-- END;
-- /



-- CREATE OR REPLACE TRIGGER Product_Received 
-- AFTER INSERT ON BUY_INFO 
-- FOR EACH ROW
-- DECLARE
-- 		buy_order_idd NUMBER;
-- BEGIN
		
-- 		buy_order_idd := :NEW.BUY_ORDER_ID; 
		
-- 		UPDATE BUY_ORDER 
-- 		SET BUY_QUANTITY=0 
-- 		WHERE BUY_ORDER_ID=buy_order_idd;
-- END;
-- /


-- SELECT GET_MAX_ORDER_ID() 
-- FROM dual
-- 
-- SELECT * FROM user_errors WHERE name = 'GET_MAX_BUY_ORDER_ID' AND type = 'FUNCTION';
