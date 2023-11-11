# Book Management Application
This repository contains a full-stack application code for managing and searching a collection of books. It provides a RESTful API for managing books, integrates MongoDB and Elasticsearch for data storage and search functionality, and offers a user-friendly front-end for exploring books.
<br>

### Demo
![Demo Video](./bookstore.gif)

## Table of Contents
- [**Features**](#features)
- [**Technologies**](#technologies)
- [**Installation**](#installation)
- [**Usage**](#usage)
  <br>

## Features
- ***Book Management***: Create, update, retrieve, and delete books using the RESTful API.
- ***Search Functionality***: Search for books based on titles, authors, or descriptions, powered by Elasticsearch.
- ***Pagination***: Display books in a paginated list on the home page for easy navigation.
- ***Data Indexing***: Books are automatically indexed in Elasticsearch when created or updated, ensuring real-time search functionality.
- ***Database Storage***: Utilize MongoDB as the database to store book records, providing robust and reliable data storage.
- ***Error handling and validation***: Error handling and validation ensure a reliable and secure application.

<br>

## Technologies
The project utilizes the following technologies:
- **Backend**:
  - ***Node.js***: The backend of the application is built using Node.js, providing a fast and scalable runtime environment.
  - ***Express.js***: A web application framework for Node.js for rapid development.
  - ***MongoDB***: MongoDB serves as the database for storing user data, tweets, and other relevant information.
  - ***TypeScript***: TypeScript is used throughout the project to ensure strong type safety and enhance the development process.
  - ***Elasticsearch***: Elasticsearch is used to search, analyze, and store large amounts of data quickly and efficiently. 
    <br>
- **Frontend**:
  - ***Next.js***: A React framework for building server-side rendered and statically generated web applications.
  - ***TypeScript***: TypeScript is used throughout the project to ensure strong type safety and enhance the development process.
  - ***Tailwind CSS***: Tailwind CSS is used for styling the frontend, offering a utility-first approach and speeding up the design process.
    
<br>

## Installation
To install the application locally, follow these steps:
1. Clone the repository to your local machine using:
```bash
    git clone https://github.com/abhijeetnishal/Digital-Book-Store.git
```
2. Navigate to the Server directory using command "cd server" and create a .env file and copy contents of .env.example file to .env file and add all secret keys to setup MongoDB database and elasticsearch(i used elastic cloud free trial). If you don't have accounts create and get secret keys.
3. Install dependencies in server directory of project:
```bash
    npm install
```
4. Start the server using comand:
```bash
    npm start
```
5. To test endpoints visit my Postman collection: https://elements.getpostman.com/redirect?entityId=28883200-f29bcb82-c8b6-46ed-99c6-4fe304a3a17c&entityType=collection

6. Now navigate to client directory of project using commands:
```bash
    cd ..
    cd client
```
7. create a .env.local file and copy contents of .env.example file to .env.local file and add host url either it's local development or production.
8. Install dependencies in client directory of project using command:
```bash
    npm install
```
9. Start the application using command:
```bash
    npm run dev
```
10. Open http://localhost:3000 in your browser to see the application.

<br>

## Usage
- To use the application, follow these steps:
  1. In Home page, paginated list of books are displayed.
  4. In Search page, we can search books based on author, title or description text.
<br>