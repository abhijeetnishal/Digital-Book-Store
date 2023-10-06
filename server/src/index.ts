import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//configure env
dotenv.config();

//Create an express instance
const app = express();

//To parse the incoming requests with JSON we are using express.json() which is a built-in middleware function in Express.
app.use(express.json());

//Define port
const port = process.env.port || 8080;

//This will allow the user in the frontend to consume the APIs that you have created without any problem.
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

//Get request when server is live
app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Server is Live');
})

//Listen the app on respective Port
app.listen(port, () => {
    console.log('Server listening at port ' + port);
})