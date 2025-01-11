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

➡️ [View complete schema details](schema.sql)




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

➡️ [View complete ERD](erd.pdf)

### Key Constraints
- **Primary Keys**: Unique identifiers for each table (single or composite)
- **Foreign Keys**: Maintain referential integrity between related tables
- **NOT NULL**: Required on critical fields:
  - All ID fields
  - Names (Owner_Name, Company_Name, etc.)
  - Key tracking fields (dates, quantities)
- **Composite Keys**: Used in:
  - Product_Category (Category_Id, Branch_Id, Company_Id)
  - Product_Info (Product_Id, Branch_Id, Company_Id)

## Technical Details

### Data Types Implementation
- **VARCHAR2(10/12/20)**: Used for:
  - IDs (User_Id, Manager_Id, etc.)
  - Names and descriptive fields
  - Status and type fields
- **NUMBER**: Used for:
  - Sequential IDs (Company_Id, Branch_Id)
  - Financial values (Salary, Unit_Price)
  - Quantities and counts
- **DATE**: Used for:
  - Order_Date
  - Supply_Date
  - Buy_Order_Date
  - Sell_Date

### Security Features
- **User Authentication**:
  - Secure password storage in User_Info
  - User type segregation for access control
- **Data Isolation**:
  - Company-specific data separation
  - Branch-level access controls
- **Transaction Security**:
  - Order tracking with status management
  - Payment method validation