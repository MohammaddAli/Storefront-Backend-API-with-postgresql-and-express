# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints 
> - GET: http://localhost:3000/user
> - GET:http://localhost:3000/user/:id
> - put: http://localhost:3000/updateUser/:id
> - post: http://localhost:3000/user
> - delete: http://localhost:3000/deleteUser
> - post: http://localhost:3000/authenticate
> - GET: http://localhost:3000/order
> - GET: http://localhost:3000/order/:id
> - put: http://localhost:3000/updateOrder
> - post: http://localhost:3000/order
> - delete: http://localhost:3000/deleteoOrder
> - GET: http://localhost:3000/order/:id/products
> - GET: http://localhost:3000/order/:user_id
> - GET: http://localhost:3000/product
> - GET: http://localhost:3000/product/:id 
> - post: http://localhost:3000/product
> - put: http://localhost:3000/updateProduct
> - delete: http://localhost:3000/deleteProduct/:id

## Database :
#### Products
- Index 
- Show
- Create [token required]

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]

## Data Shapes and schema
#### Product
-  id :SERIAL PRIMARY KEY   (primary key)
- name :VARCHAR
- price :Integer

#### User
- id :SERIAL PRIMARY KEY   (primary key)
- firstName :VARCHAR
- lastName :VARCHAR
- user_name :VARCHAR
- password :VARCHAR

#### Orders
- id :SERIAL PRIMARY KEY   (primary key)
- user_id :bigint REFERENCES   (foreign key)
- status of order (active or complete) :VARCHAR
  
#### Order-Products
- id :SERIAL PRIMARY KEY   (primary key)
- quantity of each product in the order :Integer
- order id :bigint REFERENCES   (foreign key)
- id of each product in the order :bigint REFERENCES   (foreign key)

