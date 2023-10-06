import { Request, Response } from "express";
import { MongoDBClient } from "../config/mongoDBConfig";

const getAllBooksDetails = async (req: Request, res: Response) => {
    try {
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error: " + error });
    }
}

const getSpecificBookDetails = async (req: Request, res: Response) => {
    try {
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal Server Error" });
    }
}

const createBook = async (req: Request, res: Response) => {
    try {
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error\n" + error });
    }
}

const updateSpecificBook = async (req: Request, res: Response) => {
    try {
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error\n" + error });
    }
}

const deleteSpecificBook = async (req: Request, res: Response) => {
    //get post Id from params
    const blogPostId = req.params.id;

    try {
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error\n" + error });
    }
}

export default {
    getAllBooksDetails,
    getSpecificBookDetails,
    createBook,
    updateSpecificBook,
    deleteSpecificBook
}