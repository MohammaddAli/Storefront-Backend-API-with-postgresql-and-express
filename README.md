# Storefront Backend Project

## About the project 
this is a storefront api application using node js and express js for the server api , it contains of three main things 1-User 2-Order 3-Product we use Authentication and Athourization and Token methods for hashing passwords and security issues ,we use an SQL database schema by using Postgresql , we made a test in the application endpoints, we made a cart funtionality by using order-products table that makes user be able to add a cart with his products in certain order, we used a Model and Handlers architicture for the endpoints and database, we used jasmine for testing.

## instructions for setting up and running the project:
> - for connecting the database : connect to "storefront_dev"
> - for building the migration up tables use : `npm run migrate`
> - for dropping the migrations tables use : `npm run demigrate`
> - for starting the server use : `npm run watch` or `npm run start`

## the application Ports :
> - the application runs on port 3000 and localhost
> - the database runs on port 5432

## Package installation instructions :
### For installing the application packages please use `npm install`
    "@types/cors": "^2.8.12",
    "@types/dotenv": "^8.2.0",
    "bcrypt": "^5.0.1",
    "body-parser": "^1.20.0",
    "cors": "^2.8.5",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "pg": "^8.7.3",
    "postgres": "^3.2.4",
    "typescript": "^4.7.4"
    "@types/bcrypt": "^5.0.0",
    "@types/express": "^4.17.13",
    "@types/jasmine": "^3.10.6",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/pg": "^7.14.11",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.33.1",
    "eslint": "^8.20.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "jasmine": "^3.99.0",
    "jasmine-spec-reporter": "^6.0.0",
    "jasmine-ts": "^0.3.3",
    "nodemon": "^2.0.19",
    "prettier": "^2.7.1",
    "supertest": "^6.2.4",
    "ts-node": "^10.9.1",
    "tsc-watch": "^4.6.2"

> - for running prettier use : `npm run prettier`
> - for running lint use : `npm run lint`
> - for connecting the database : connect to "storefront_test"
> - for running test use : `npm run test` 

## Technologies and tools used:
> - Node js
> - Express js for server side and api
> - Postgresql for database
> - Lint and Prettier for linting the code
> - json web token (JWT) and bcrypt for Authentication and Athourization



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

