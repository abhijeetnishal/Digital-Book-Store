import { Request, Response } from "express";
import { mongoDBClient } from "../config/mongoDBConfig";
import { ObjectId } from "mongodb";

const getAllBooksDetails = async (req: Request, res: Response) => {
    try {
        //Get page number from query
        const { page } = req.query;

        if(!page){
            return res.status(400).json({message: 'page number not found'});
        }
        else{
            //get db method to get collection details
            const db = await mongoDBClient();
            const collection = db.collection('books');

            const limit = 9;
            const skip = (Number(page) - 1) * limit;
            
            //Get all books details
            const booksDetails = await collection.find().skip(skip).limit(limit).toArray();

            return res.status(200).json({data: booksDetails});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error: " + error });
    }
}

const getSpecificBookDetails = async (req: Request, res: Response) => {
    try {
        //Get book id from params
        const bookId = req.params.id;

        //get db method to get collection details
        const db = await mongoDBClient();
        const collection = db.collection('books');

        //Get specific book details from book id
        const bookDetails = await collection.findOne({_id: new ObjectId(bookId)});

        if(bookDetails)
            return res.status(200).json({data: bookDetails});
        else
            return res.status(404).json({message: 'no such book found'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error: "+ error });
    }
}

const createBook = async (req: Request, res: Response) => {
    try {
        //Get book details
        const { title, author, publicationYear, isbn, description } = req.body;

        //Get db to get collection
        const db = await mongoDBClient();
        const collection = db.collection('books');

        //Insert a book details into DB
        const bookDetails = await collection.insertOne({
            title: title,
            author: author,
            publication_year: publicationYear,
            isbn: isbn,
            description: description
        });

        res.status(201).json({data: bookDetails});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error: " + error });
    }
}

const updateSpecificBook = async (req: Request, res: Response) => {
    try {
        //Get book id from params
        const bookId = req.params.id;

        //Get book details
        const { title, author, publicationYear, isbn, description } = req.body;

        //Get db to get collection
        const db = await mongoDBClient();
        const collection = db.collection('books');

        //Get specific book details from book id
        const bookDetails = await collection.findOne({_id: new ObjectId(bookId)});

        if(!bookDetails){
            return res.status(404).json({message: 'no such book found to delete'});
        }
        else{
            //Update a book details into DB
            const updatedBookDetails = await collection.updateOne( bookDetails,
                { 
                    $set: {
                        title: title,
                        author: author,
                        publication_year: publicationYear,
                        isbn: isbn,
                        description: description
                    }
                }
            );

            res.status(200).json({data: updatedBookDetails});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error: " + error });
    }
}

const deleteSpecificBook = async (req: Request, res: Response) => {
    try {
        //Get book id from params
        const bookId = req.params.id;

        //Get db to get collection
        const db = await mongoDBClient();
        const collection = db.collection('books');

        //Delete the book using book id
        const bookDetails = await collection.deleteOne({_id: new ObjectId(bookId)});

        if(bookDetails.deletedCount)
            res.status(201).json({message: 'book deleted'});
        else    
            res.status(404).json({meessage: 'no such book found to delete'})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error: " + error });
    }
}

export default {
    getAllBooksDetails,
    getSpecificBookDetails,
    createBook,
    updateSpecificBook,
    deleteSpecificBook
}