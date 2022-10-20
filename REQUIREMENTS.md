# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index  ['/products'] - GET
- Show (args: product_id) ['/products/:id'] - GET
- Create (args: Product) ['/products'] [token required] - POST
- Delete (args: product_id) ['/products'] [token required] - DELETE

#### Users
- Index ['/users'] [token required] - GET
- Show (args: user_id) ['/users/:id'] [token required] - GET
- Create (args: User) ['/users'] [token required] - POST
- Delete (args: user_id) ['/users'] [token required] - DELETE
- Authenticate (args: phone, password) ['/authenticate'] [token required] - POST

#### Orders
- Index  ['/orders'] - GET
- Create (args: Product)  ['/orders'] - POST
- Show (args: order_id) ['/orders/:id'] [token required] - GET
- AddProduct (args: quantity, order_id, product_id) ['/orders/:id/products'] - POST
- GetProducts ['/orders/products'] - GET
- Delete (args: order_id) ['/orders'] - DELETE

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- phone
- password

#### Orders
- id
- user_id
- status

#### order_products
- id
- quantity
- order_id
- product_id
