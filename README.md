# Nodejs_Storefront_Project
2nd submission for EGFWD's Udacity full-stack development course<br/>
by: Ahmed Mohamed Mostafa<br/>
email: ahmed.mohamed.mustafa1999@gmail.com<br/>

Storefront backend submission for EGFWD's full stack web development course

## Required packages

Your application must make use of the following libraries:

- **Prettier** to catch formatting errors.
- **Lint** to catch programming errors.
- **Express** to start server and manage routes.
- **Jasmine** to write test cases for the code.
- **Supertest** for endpoint testing.
- **Bcrypt** for password hashing.
- **DB-migarate** for database migration.
- **Postgres** for database management.
- **JWT** for web tokens and authorization.
- **Randomstring** for creating unique phone numbers.
- **Dotenv** for enviroment variable access.

### Initial steps
first create the databases Storefront and storefront_test<br/>
and create .env file in the root folder and put the following variables inside it:<br/>
 >POSTGRES_HOST = 127.0.0.1<br/>
 >POSTGRES_DB = Storefront<br/>
 >POSTGRES_TEST = storefront_test<br/>
 >POSTGRES_USER = postgres<br/>
 >POSTGRES_PASSWORD = 123<br/>
 >ENV = dev<br/>
 >BCRYPT_PASSWORD=speak-friend-and-enter<br/>
 >SALT_ROUNDS=10<br/>
 >TOKEN_SECRET=secret123!<br/>

### 2. API ENDPOINTS
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

### 3. Scripts

> "build": builds the project form typescript.<br/>
> "migrate": runs UP database migrations.<br/>
> "test": to run the unit test on the test database enviroment.<br/>

to run the server simply run:<br/>
>node build/server
