# Inventory Management System

## Overview
The Inventory Management System (IMS) is designed to manage products, orders, and users within a company and its branches. This system helps different types of users interact with various functionalities, such as placing orders, managing products, and viewing sales data. The project focuses on practicing and learning SQL by working with OracleDB, ensuring a deep understanding of relational databases and complex SQL queries.

## Main Goal
The primary goal of this project is to learn SQL by using OracleDB. By building and interacting with a real-world database, the project helps in gaining practical experience in managing relational databases, creating complex queries, and understanding the relationships between tables in a structured manner.



## Database Structure

### Core Tables
1. **Owner_Info**
   - Manages company ownership with Owner_Id (PK), Company_Id, Owner_Name
   - Primary source for company ownership records

2. **Company_Info**
   - Stores company details with Company_Id (PK), Owner_Id (FK), Company_Name
   - Links companies to owners through Owner_Info

3. **User_Info**
   - Controls system access with User_Id (PK), User_Type, Company_Id (FK), Password
   - Manages authentication and authorization for all system users

4. **Branch_Info**
   - Tracks branches with Branch_Id (PK), Company_Id (FK), Manager_Id (FK), Location_Name
   - Central to organizational structure management

5. **Manager_Info**
   - Records manager details with Manager_Id (PK), Branch_Id (FK), Company_Id (FK)
   - Includes Manager_Name and Salary information

6. **Employee_Info**
   - Maintains employee records with Employee_Id (PK), Branch_Id (FK), Company_Id (FK)
   - Tracks Employee_Name and Salary data

### Product Management
1. **Product_Category**
   - Uses composite PK (Category_Id, Branch_Id, Company_Id)
   - Enables branch-specific product categorization

2. **Product_Info**
   - Composite PK (Product_Id, Branch_Id, Company_Id)
   - Tracks:
     - Unit_Price and Quantity
     - Color and Product_Size
     - Discount information
     - Supplier associations (FK to User_Info)

### Transaction Management
1. **Order_Details**
   - Tracks orders with Order_Id (PK)
   - Records:
     - Customer_Id (FK)
     - Product details (Product_Id, Category_Id)
     - Order_Date and Order_Quantity
     - Payment_Method and Product_Status

2. **Sell_Info**
   - Records sales with Order_Id (PK)
   - Captures:
     - Product identification
     - Sell_Date and Sell_Quantity
     - Payment_Method

3. **Buy_Order**
   - Manages purchases with Buy_Order_Id (PK)
   - Links to Manager_Info for authorization
   - Records order dates and quantities

4. **Buy_Info**
   - Processes supplier transactions with Buy_Order_Id (PK)
   - Includes:
     - Supply details and pricing
     - Payment methods
     - Supplier contact information

### Stakeholder Information
1. **Customer_Info**
   - Customer_Id (PK), Branch_Id (FK), Company_Id (FK)
   - Maintains customer profiles and branch associations

2. **Supplier_Info**
   - Supplier_Id (PK), Company_Id (FK)
   - Records Supplier_Name and Contact_Number

➡️ [View complete Schema](https://github.com/Waseem-Mustak/Inventory-Management-System/blob/main/schema.sql)




## Database Relationships

### Primary Relationships
Detailed relationships between tables:
- Owner_Info (1) → Company_Info (1)
- Company_Info (1) → Branch_Info (M)
- Branch_Info (1) → Manager_Info (1)
- Branch_Info (1) → Employee_Info (M)
- Product_Info (M) ← Product_Category (1)
- Order_Details (M) ← Customer_Info (1)
- Product_Info (M) ← Supplier_Info (1)

➡️ [View complete ERD](https://github.com/Waseem-Mustak/Inventory-Management-System/blob/main/ERD.pdf)



## Features

### Multi-Level User Management
- **Owner Portal**
  - Create and manage multiple companies
  - Monitor company-wide performance
  - Set system-wide policies

- **Manager Dashboard**
  - Branch-specific oversight
  - Staff management capabilities
  - Purchase order authorization
  - Real-time inventory monitoring

- **Employee Access**
  - Process customer orders
  - Update inventory records
  - Handle sales transactions

### Inventory Control System
- **Product Management**
  - Categorize products by type and branch
  - Track quantities and locations
  - Monitor stock levels
  - Set price points and discounts
  - Color and size variant tracking

- **Stock Monitoring**
  - Real-time inventory updates
  - Low stock alerts
  - Branch-wise stock distribution
  - Product movement tracking

### Order Processing System
- **Customer Orders**
  - Order creation and tracking
  - Status updates
  - Payment method processing
  - Delivery status monitoring

- **Purchase Orders**
  - Supplier order management
  - Order quantity tracking
  - Supply date monitoring
  - Payment processing

### Sales Management
- **Transaction Processing**
  - Record sales transactions
  - Process multiple payment methods
  - Generate transaction records
  - Track sales by branch

- **Customer Management**
  - Customer profile maintenance
  - Purchase history tracking
  - Branch-wise customer database
  - Customer relationship management

### Supply Chain Management
- **Supplier Relations**
  - Supplier profile management
  - Contact information tracking
  - Supply history monitoring
  - Price and payment tracking

- **Purchase Management**
  - Buy order creation
  - Supply delivery tracking
  - Payment processing
  - Supplier performance monitoring

### Branch Management
- **Location Control**
  - Multiple branch support
  - Branch-specific inventory
  - Location-based management
  - Branch performance tracking

### Security and Access Control
- **User Authentication**
  - Secure login system
  - Role-based access control
  - Password protection
  - User activity tracking

### Reporting and Analytics
- **Business Intelligence**
  - Sales performance tracking
  - Inventory level monitoring
  - Order fulfillment rates
  - Supplier performance metrics

### Data Integrity
- **Database Management**
  - Referential integrity
  - Data consistency
  - Transaction management
  - Backup and recovery

### Multi-Company Support
- **Organization Management**
  - Multiple company support
  - Company-wise data isolation
  - Cross-branch operations
  - Scalable architecture



## Technologies Used
- **Node.js**: JavaScript runtime for building the server-side logic.
- **HTML**: Used for structuring the user interface.
- **CSS**: For styling the front-end.
- **OracleDB**: The database management system used to store and manage data.



## Setup and Run  
Follow these steps to set up and run the application locally:  

### Clone the repository  
```bash  
git clone https://github.com/Waseem-Mustak/Inventory-Management-System.git  
cd Inventory-Management-System  
```

### Ensure OracleDB is running on your system or server.  
### Execute the schema.sql file to set up the database schema.  
➡️ [Sql Schema](https://github.com/Waseem-Mustak/Inventory-Management-System/blob/main/schema.sql) 

### Update the OracleDB connection configuration in the project (e.g., config/db.js).  
javascript  
module.exports = {  
    user: 'your-username',  
    password: 'your-password',  
    connectString: 'host:port/SID',  
};  

### Install dependencies  
```bash
npm install
```  

### Run the application 
```bash
cd "Business Stock Inventory" 
node index.js  
```

### Access the application in your browser at  
http://localhost:3000  