import { Request, Response } from "express";
import { mongoDBClient } from "../config/mongoDBConfig";
import { ObjectId } from "mongodb";
import elasticClient from "../config/elasticsearchConfig";

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

            //Set pagination limit
            const limit = 9;
            const skip = (Number(page) - 1) * limit;
            
            //Get paginated books details
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

        if(!bookId){
            return res.status(400).json({messaage: 'book id missing'});
        }

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

const searchBooks = async (req: Request, res: Response) => {
    try {
        const { query } = req.query; // The search query parameter

        if (!query) {
            return res.status(400).json({ message: 'missing search query parameter' });
        }
        else{
          const response = await elasticClient.search({
            index: 'books', // Replace with your Elasticsearch index
            body: {
              query: {
                bool: {
                  should: [
                    {
                      wildcard: {
                        title: `*${query}*`,
                      },
                    },
                    {
                      wildcard: {
                        author: `*${query}*`,
                      },
                    },
                    {
                      wildcard: {
                        description: `*${query}*`,
                      },
                    },
                  ],
                },
              },
            },
          });
      
          const hits = response.hits.hits.map((hit) => hit._source);
      
          return res.status(200).json({ data: hits });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error: " + error });
    }
}

const createBook = async (req: Request, res: Response) => {
    try {
        //Get book details
        const { title, author, publicationYear, isbn, description } = req.body;

        if(!title || !author || !publicationYear || !isbn || !description)
            return res.status(400).json('enter required fields');

        //Get db to get collection
        const db = await mongoDBClient();
        const collection = db.collection('books');

        //Insert a book details into DB
        const bookDetails = {
            title: title,
            author: author,
            publicationYear: publicationYear,
            isbn: isbn,
            description: description
        };

        const result = await elasticClient.index({
            index: 'books',
            document: bookDetails,
        });

        await collection.insertOne(bookDetails);

        res.status(201).json({data: result});
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

        if(!bookId){
            return res.status(400).json({messaage: 'book id missing'});
        }

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

            //Search the document based on isbn
            const searchResponse = await elasticClient.search({
                index: 'books',
                body: {
                    query: {
                        match: {
                            isbn: bookDetails.isbn,
                        },
                    },
                },
            });
        
            if(searchResponse.hits.total === 0) {
                return res.status(404).json('no such documents found');
            }
            else{
                //Get the document id
                const documentId = searchResponse.hits.hits[0]._id;
            
                //Update the document using document id
                const updatedResponse = await elasticClient.update({
                    index: 'books',
                    id: documentId,
                    body: {
                        doc: {
                            title: title ? title : bookDetails.title,
                            author: author ? author : bookDetails.author,
                            publication_year: publicationYear ? publicationYear : bookDetails.publication_year,
                            isbn: isbn ? isbn : bookDetails.isbn,
                            description: description ? description : bookDetails.description
                        },
                    },
                });

                return res.status(200).json({mongoUpdateInfo: updatedBookDetails, elasticsearchUpdateInfo: updatedResponse });
            }
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

        if(!bookId){
            return res.status(400).json({messaage: 'book id missing'});
        }

        //Get db to get collection
        const db = await mongoDBClient();
        const collection = db.collection('books');

        //Get specific book details from book id
        const bookDetails = await collection.findOne({_id: new ObjectId(bookId)});

        //Search the document based on isbn
        const searchResponse = await elasticClient.search({
            index: 'books',
            body: {
                query: {
                    match: {
                        isbn: bookDetails.isbn,
                    },
                },
            },
        });
    
        if(searchResponse.hits.total === 0) {
            return res.status(404).json('no such documents found');
        }
        else{
            //Get the document id
            const documentId = searchResponse.hits.hits[0]._id;
        
            await elasticClient.delete({
                index: "books",
                id: documentId,
            });

            //Delete the book using book id
            await collection.deleteOne({_id: new ObjectId(bookId)});
    
            if(bookDetails)
                return res.status(200).json({message: 'book deleted'});
            else    
                return res.status(404).json({meessage: 'no such book found to delete'})   
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error: " + error });
    }
}

export default {
    getAllBooksDetails,
    getSpecificBookDetails,
    searchBooks,
    createBook,
    updateSpecificBook,
    deleteSpecificBook
}