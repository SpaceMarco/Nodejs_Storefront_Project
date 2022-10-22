# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

### 2. API ENDPOINTS
the API runs on port 3000<br/>
https://localhost:3000

#### Products
- Index  ['/products'] - GET
- Show (args: product_id) ['/products/:id'] - GET
- Create (args: Product) ['/products'] [token required] - POST
- Delete (args: product_id) ['/products'] [token required] - DELETE

#### Users
- Index ['/users'] [token required] - GET
- Show (args: user_id) ['/users/:id'] [token required] - GET
- Create (args: User) ['/users'] - POST
- Delete (args: user_id) ['/users'] [token required] - DELETE
- Authenticate (args: phone, password) ['/authenticate'] [token required] - POST

#### Orders
- Index  ['/orders'] [token required] - GET
- Create (args: Product)  ['/orders'] [token required] - POST
- Show (args: order_id) ['/orders/:id'] [token required] - GET
- AddProduct (args: quantity, order_id, product_id) ['/orders/:id/products'] [token required] - POST
- GetProducts ['/orders/products'] [token required] - GET
- Delete (args: order_id) ['/orders'] [token required] - DELETE

## Data Shapes
#### Product

| Value  | Data |
| ------------- | ------------- |
| id  | SERIAL PRIMARY KEY  |
| name  | VARCHAR(64) NOT NULL  |
| price  | INTEGER NOT NULL  |

#### User

| Value  | Data |
| ------------- | ------------- |
| id  | SERIAL PRIMARY KEY  |
| firstName  | VARCHAR(32)  |
| lastName  | VARCHAR(255)  |
| phone  | VARCHAR(13) NOT NULL UNIQUE  |
| password  | VARCHAR(255)  |

#### Orders

| Value  | Data |
| ------------- | ------------- |
| id  | SERIAL PRIMARY KEY  |
| status  | VARCHAR(64) NOT NULL  |
| user_id  | bigInt REFERENCES users(id)  |
| order_date  | DATE  |

#### order_products

| Value  | Data |
| ------------- | ------------- |
| id  | SERIAL PRIMARY KEY  |
| quantity  | INTEGER  |
| order_id  | bigint REFERENCES orders(id)  |
| product_id  | bigInt REFERENCES products(id)  |

## Database schema
![Untitled Diagram (2)](https://user-images.githubusercontent.com/60396165/197323866-ce9b630e-9def-48dd-8d45-f81964bbb583.jpg)

