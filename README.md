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

➡️ [View complete schema details](https://github.com/Waseem-Mustak/Inventory-Management-System/blob/main/schema.sql)




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



## Setup and Run  
Follow these steps to set up and run the application locally:  

```bash  
# Clone the repository  
git clone https://github.com/Waseem-Mustak/Inventory-Management-System.git  
cd Inventory-Management-System  

# Ensure OracleDB is running on your system or server.  
# Execute the schema.sql file to set up the database schema.  
sql  
@path/to/schema.sql  

# Update the OracleDB connection configuration in the project (e.g., config/db.js).  
javascript  
module.exports = {  
    user: 'your-username',  
    password: 'your-password',  
    connectString: 'host:port/SID',  
};  

# Install dependencies  
npm install  

# Run the application 
cd "Business Stock Inventory" 
node index.js  

# Access the application in your browser at  
http://localhost:3000  






## Features

### 1. **User Roles**:
   - **Owner**: 
     - Can add new branches, managers, employees, and suppliers.
     - Has full access to all branch details, including the number of products, sold items, and order information across all branches.
   - **Manager**:
     - Manages a single branch.
     - Can receive orders and mark them as delivered.
     - Views products and orders specific to their branch.
   - **Employee**:
     - Can track products and orders within their branch.
   - **Customer**:
     - Can place orders and view their order history.
   - **Supplier**:
     - Supplies products and views relevant supply details.

### 2. **Company Structure**:
   - **Company**: A company can have multiple branches.
   - **Branch**: Each branch can have different product categories and products.
   - **Product Category**: Categories to organize products (e.g., Electronics, Furniture).
   - **Product**: Individual items available for sale in various categories.

### 3. **Order Management**:
   - Customers can place orders for products.
   - Managers and employees can view and track orders.
   - Owners can monitor orders across all branches.

### 4. **Product Management**:
   - Managers and employees can track and manage product stock.
   - Suppliers can provide new products to the system.

## Schema and ERD

The system uses a relational database, and the following entities are represented:

- **Users**: Stores information for different roles (Owner, Manager, Employee, Customer, Supplier).
- **Companies**: Contains details about the companies in the system.
- **Branches**: Information about the company's branches.
- **Products**: Product details, organized by category and linked to branches.
- **Orders**: Information about customer orders.
- **Suppliers**: Details of suppliers providing products.

You can view the **Entity-Relationship Diagram (ERD)** and **Database Schema** here:  
[View ERD Diagram](link-to-erd-diagram)

## Technologies Used
- **Node.js**: JavaScript runtime for building the server-side logic.
- **HTML**: Used for structuring the user interface.
- **CSS**: For styling the front-end.
- **OracleDB**: The database management system used to store and manage data.

## Installation

To get started with the project, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Waseem-Mustak/Inventory-Management-System.git
