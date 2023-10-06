import express from "express";
import booksController from "../controllers/booksController";

//create a router for blog posts
const booksRouter = express.Router();

//create an endpoint to get all the books details
booksRouter.get('/', booksController.getAllBooksDetails);

//create an endpoint to get a specific book detail
booksRouter.get('/:id', booksController.getSpecificBookDetails);

//create an endpoint to create a book
booksRouter.post('/', booksController.createBook);

//create an endpoint to update a specific book detail
booksRouter.put('/:id', booksController.updateSpecificBook);

//create an endpoint to delete a specific book detail
booksRouter.delete('/:id', booksController.deleteSpecificBook);

export default booksRouter;