CREATE OR REPLACE FUNCTION GET_MAX_BUY_ORDER_ID
RETURN NUMBER IS
 num1 NUMBER ;
 num2 NUMBER ;
 maxnum NUMBER;
BEGIN
	SELECT NVL(MAX(buy_order_id),0) INTO num1 FROM BUY_ORDER;
	SELECT NVL(MAX(buy_order_id),0) INTO num2 FROM BUY_INFO;

	IF num1 >= num2 THEN 
	maxnum := num1 ;
	ELSE
	maxnum := num2;
	END IF ;
	RETURN maxnum ;
END ;
/

-- SELECT * FROM ORDER_DETAILS
-- SELECT * FROM SELL_INFO

CREATE OR REPLACE FUNCTION GET_MAX_ORDER_ID
RETURN NUMBER IS
 num1 NUMBER ;
 num2 NUMBER ;
 maxnum NUMBER;
BEGIN
	SELECT NVL(MAX(order_id),0) INTO num1 FROM ORDER_DETAILS;
	SELECT NVL(MAX(order_id),0) INTO num2 FROM SELL_INFO;

	IF num1 >= num2 THEN 
	maxnum := num1 ;
	ELSE
	maxnum := num2;
	END IF ;
	RETURN maxnum ;
END ;
/



CREATE OR REPLACE TRIGGER Order_Delivered 
AFTER INSERT ON SELL_INFO 
FOR EACH ROW
DECLARE
    MESSAGE VARCHAR2(100);
BEGIN
    -- Fetch the PRODUCT_STATUS from ORDER_DETAILS for the corresponding ORDER_ID
    SELECT PRODUCT_STATUS INTO MESSAGE
    FROM ORDER_DETAILS
    WHERE ORDER_ID = :NEW.ORDER_ID;

    -- Check if the PRODUCT_STATUS is 'Received'
    IF MESSAGE = 'Received' THEN
        -- Update the PRODUCT_STATUS to 'Delivered' in ORDER_DETAILS
        UPDATE ORDER_DETAILS 
				SET ORDER_QUANTITY=0,PRODUCT_STATUS='Delivered' 
				WHERE ORDER_ID= :NEW.ORDER_ID;
    END IF;
END;
/



CREATE OR REPLACE TRIGGER Product_Received 
AFTER INSERT ON BUY_INFO 
FOR EACH ROW
DECLARE
		buy_order_idd NUMBER;
BEGIN
		
		buy_order_idd := :NEW.BUY_ORDER_ID; 
		
		UPDATE BUY_ORDER 
		SET BUY_QUANTITY=0 
		WHERE BUY_ORDER_ID=buy_order_idd;
END;
/


-- SELECT GET_MAX_ORDER_ID() 
-- FROM dual
-- 
-- SELECT * FROM user_errors WHERE name = 'GET_MAX_BUY_ORDER_ID' AND type = 'FUNCTION';





-- CREATE TABLE Product_Info(
-- 
-- Product_Id VARCHAR2(10) not NULL, 
-- Branch_Id NUMBER ,
-- Company_Id NUMBER,
-- Category_Id VARCHAR2(10),
-- Supplier_Id VARCHAR2(10),
-- Unit_Price NUMBER,
-- Quantity NUMBER,
-- Color VARCHAR2(10),
-- Product_Size VARCHAR2(10),
-- Discount NUMBER,
-- 
-- PRIMARY KEY(Product_Id),
-- FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
-- FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id),
-- FOREIGN KEY(Category_Id) REFERENCES Product_Category(Category_Id),
-- FOREIGN KEY(Supplier_Id) REFERENCES User_Info(User_Id)
-- );


-- CREATE TABLE Order_Details(
-- Order_Id NUMBER,
-- Customer_Id VARCHAR2(10),
-- Product_Id VARCHAR2(10), 
-- Branch_Id NUMBER ,
-- Company_Id NUMBER,
-- Category_Id VARCHAR2(10),
-- 
-- Order_Date DATE,
-- Order_Quantity NUMBER,
-- Payment_Method VARCHAR2(10),
-- Product_Status VARCHAR2(10),
-- 
-- 
-- PRIMARY KEY(Order_Id),
-- FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
-- FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id),
-- FOREIGN KEY(Category_Id) REFERENCES Product_Category(Category_Id),
-- FOREIGN KEY(Customer_Id) REFERENCES Customer_Info(Customer_Id),
-- FOREIGN KEY(Product_Id) REFERENCES Product_Info(Product_Id)
-- );

-- CREATE TABLE Sell_Info(
-- Order_Id NUMBER,
-- Product_Id VARCHAR2(10), 
-- Branch_Id NUMBER ,
-- Company_Id NUMBER,
-- Category_Id VARCHAR2(10),
-- 
-- Sell_Date DATE,
-- Sell_Quantity NUMBER,
-- Payment_Method VARCHAR2(10),
-- 
-- 
-- PRIMARY KEY(Order_Id),
-- FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
-- FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id),
-- FOREIGN KEY(Category_Id) REFERENCES Product_Category(Category_Id),
-- FOREIGN KEY(Product_Id) REFERENCES Product_Info(Product_Id)
-- );
-- 
-- CREATE TABLE Buy_Order(
-- Buy_Order_Id NUMBER,
-- Product_Id VARCHAR2(10), 
-- Manager_Id VARCHAR2(10),
-- Category_Id VARCHAR2(10),
-- 
-- Buy_Order_Date DATE,
-- Buy_Quantity NUMBER,
-- 
-- 
-- PRIMARY KEY(Buy_Order_Id),
-- FOREIGN KEY(Category_Id) REFERENCES Product_Category(Category_Id),
-- FOREIGN KEY(Manager_Id) REFERENCES Manager_Info(Manager_Id),
-- FOREIGN KEY(Product_Id) REFERENCES Product_Info(Product_Id)
-- );
-- 
-- CREATE TABLE Buy_Info(
-- Buy_Order_Id NUMBER,
-- Supplier_Id VARCHAR2(10),
-- Product_Id VARCHAR2(10), 
-- Category_Id VARCHAR2(10),
-- 
-- Supply_Date DATE,
-- Supply_Price NUMBER,
-- Contact_Info NUMBER,
-- Payment_Method VARCHAR2(10),
-- 
-- 
-- PRIMARY KEY(Buy_Order_Id),
-- FOREIGN KEY(Category_Id) REFERENCES Product_Category(Category_Id),
-- FOREIGN KEY(Supplier_Id) REFERENCES User_Info(User_Id),
-- FOREIGN KEY(Product_Id) REFERENCES Product_Info(Product_Id)
-- );





-- CREATE TABLE Product_Info(
-- Order_Id NUMBER NOT NULL,
-- Customer_Id VARCHAR2(10) not NULL, 
-- Branch_Id NUMBER ,
-- Company_Id NUMBER,
-- Customer_Name VARCHAR2(12),
-- PRIMARY KEY(Customer_Id),
-- FOREIGN KEY(Company_Id) REFERENCES Company_Info(Company_Id),
-- FOREIGN KEY(Branch_Id) REFERENCES Branch_Info(Branch_Id)
-- );

--  SELECT * from Owner_info;
--  INSERT INTO Company_info VALUES(1,1,'Jio');
--  
--  
--  INSERT INTO User_Info VALUES('Fihad','Manager',1,'fihad');
--  INSERT INTO User_Info VALUES('Zisan','Manager',1,'zisan');
--  INSERT INTO User_Info VALUES('Ayon','Manager',1,'ayon');
--  INSERT INTO User_Info VALUES('Hameem','Manager',1,'hameem');
--  
--  INSERT INTO Branch_info VALUES(1,1,'Fihad','Dinajpur');
--  INSERT INTO Branch_info VALUES(2,1,'Zisan','Mymensingh');
--  INSERT INTO Branch_info VALUES(3,1,'Ayon','Bogura');
--  INSERT INTO Branch_info VALUES(4,1,'Hameem','Khulna');
--  
--  SELECT * FROM Branch_Info;
 
 
-- CREATE TABLE Company_Info(
-- Owner_Id NUMBER NOT NULL,
-- Company_Id NUMBER NOT NULL,
-- Owner_Name VARCHAR2(20) NOT NULL,
-- PRIMARY KEY(Owner_Id)
-- -- FOREIGN KEY(Company_Id) REFERENCES User_Info(Company_Id)
-- --  user_name VARCHAR2(10) NOT NULL,
-- --  password VARCHAR2(10) NOT NULL,
-- --  PRIMARY KEY(user_name)
-- );


--SELECT * FROM owner_info;
-- CREATE TABLE Student(
--  roll NUMBER(7) NOT NULL,
--  ssc_gpa NUMBER(3,2) NOT NULL,
--  hsc_gpa number(3,2) NOT NULL,
--  user_name VARCHAR2(10) NOT NULL,
--  FOREIGN KEY(user_name) REFERENCES User_Info(user_name),
--  PRIMARY KEY(roll),
--  UNIQUE(user_name)
-- );






















-- SELECT * FROM ORDER_DETAILS
-- SELECT * FROM SELL_INFO
-- SELECT * FROM BRANCH_INFO
-- SELECT * FROM PRODUCT_INFO
-- SELECT * FROM BUY_ORDER
-- SELECT NVL(MAX(buy_order_id),0) FROM BUY_ORDER
-- 
-- SELECT O.ORDER_ID,O.CUSTOMER_ID,O.PRODUCT_ID,O.CATEGORY_ID,B.LOCATION_NAME,O.ORDER_QUANTITY+NVL(S.SELL_QUANTITY, 0),O.PAYMENT_METHOD,O.PRODUCT_STATUS
-- FROM ORDER_DETAILS O LEFT OUTER JOIN SELL_INFO S
-- ON O.ORDER_ID=S.ORDER_ID
-- JOIN BRANCH_INFO B
-- ON O.BRANCH_ID=B.BRANCH_ID
-- WHERE O.CUSTOMER_ID='Sifat' AND O.COMPANY_ID=1
-- 
-- -- 		SELECT b.BUY_ORDER_ID,b.PRODUCT_ID,b.CATEGORY_ID,bb.LOCATION_NAME,b.BUY_ORDER_DATE,b.BUY_QUANTITY
-- 		SELECT *
--     FROM BUY_ORDER b JOIN BRANCH_INFO bb
--     on b.MANAGER_ID=bb.MANAGER_ID
--     WHERE b.BUY_QUANTITY>0 AND bb.COMPANY_ID=1
-- 
-- SELECT * FROM ORDER_DETAILS
-- 
-- DELETE 
-- FROM BUY_ORDER
-- WHERE PRODUCT_ID='dfghj'
-- AND MANAGER_ID=(
-- 	SELECT MANAGER_ID
-- 	FROM MANAGER_INFO
-- 	WHERE BRANCH_ID=1
-- )
-- 
-- DELETE 
-- FROM ORDER_DETAILS
-- WHERE PRODUCT_ID='Samsung'
-- AND BRANCH_ID=1
-- AND COMPANY_ID=1
-- 
-- DELETE 
-- FROM PRODUCT_INFO
-- WHERE PRODUCT_ID='Samsung'
-- AND BRANCH_ID=1
-- AND COMPANY_ID=1
-- 
-- SELECT * FROM BUY_ORDER
-- SELECT * FROM BUY_INFO