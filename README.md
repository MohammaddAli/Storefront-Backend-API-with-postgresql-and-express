# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

## About the project 
this is a storefront api application using node js and express js for the server api , it contains of three main things 1-User 2-Order 3-Product we use Authentication and Athourization and Token methods for hashing passwords and security issues ,we use an SQL database schema by using Postgresql , we made a test in the application endpoints, we made a cart funtionality by using order-products table that makes user be able to add a cart with his products in certain order, we used a Model and Handlers architicture for the endpoints and database, we used jasmine for testing.

## Technologies and tools used:
> - Node js
> - Express js for server side and api
> - Postgresql for database
> - Lint and Prettier for linting the code
> - json web token (JWT) and bcrypt for Authentication and Athourization

## Application scripts and commands for running the application:
> - for starting the server use : `npm run watch` or `npm run start`
> - for building the migrations tables use : `npm run migrate`
> - for dropping the migrations tables use : `npm run demigrate`
> - for running test use : `npm run test` 
> - for running prettier use : `npm run prettier`
> - for running lint use : `npm run lint`
> - the application runs on port 3000 and localhost

## Database schema and Data Shapes:
#### Product
-  id
- name
- price
#### User
- id
- firstName
- lastName
- user_name
- password
#### Orders
- id
- status of order (active or complete)
- user_id

#### Order-Products
- id
- quantity of each product in the order
- order id
- id of each product in the order

## All the Endpoints :
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