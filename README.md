# Inventory Management System

## Overview
The Inventory Management System (IMS) is designed to manage products, orders, and users within a company and its branches. This system helps different types of users interact with various functionalities, such as placing orders, managing products, and viewing sales data. The project focuses on practicing and learning SQL by working with OracleDB, ensuring a deep understanding of relational databases and complex SQL queries.

## Main Goal
The primary goal of this project is to learn SQL by using OracleDB. By building and interacting with a real-world database, the project helps in gaining practical experience in managing relational databases, creating complex queries, and understanding the relationships between tables in a structured manner.

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
   git clone https://github.com/yourusername/Inventory-Management-System.git
