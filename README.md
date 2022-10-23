# Nodejs_Storefront_Project
2nd submission for EGFWD's Udacity full-stack development course<br/>
by: Ahmed Mohamed Mostafa<br/>
email: ahmed.mohamed.mustafa1999@gmail.com<br/>

Storefront backend submission for EGFWD's full stack web development course

## Required packages

the Application must make use of the following libraries:

use **"npm install _____"** to install the following packages

- **Prettier** to catch formatting errors.
- **Lint** to catch programming errors.
- **Express** to start server and manage routes.
- **Jasmine** to write test cases for the code.
- **Supertest** for endpoint testing.
- **Bcrypt** for password hashing.
- **DB-migarate** for database migration.
- **Postgres** for database management.
- **jsonwebtoken** for web tokens and authorization.
- **Randomstring** for creating unique phone numbers.
- **Dotenv** for enviroment variable access.

### Initial steps
first create the databases Storefront and storefront_test in postgres<br/>

>CREATE DATABASE Storefront;<br/>
>CREATE DATABASE storefront_test;


and create .env file in the root folder and put the following variables inside it:<br/>
.emv is already added to .gitignore<br/>
 >POSTGRES_HOST = 127.0.0.1<br/>
 >POSTGRES_DB = Storefront<br/>
 >POSTGRES_TEST = storefront_test<br/>
 >POSTGRES_USER = postgres<br/>
 >POSTGRES_PASSWORD = 123<br/>
 >ENV = test<br/>
 >BCRYPT_PASSWORD=speak-friend-and-enter<br/>
 >SALT_ROUNDS=10<br/>
 >TOKEN_SECRET=secret123!<br/>

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

### 3. Scripts

> "build": builds the project form typescript.<br/>
> "migrate": runs UP database migrations.<br/>
> "test": to run the unit test on the test database enviroment.<br/>

use **"npm run test"** to run all tests.. <br/>
![image](https://user-images.githubusercontent.com/60396165/197418096-6d48f3bd-c803-4fe0-ae18-137797378d55.png)

to run the server simply run:<br/>
>node build/server<br/>

