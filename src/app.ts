/***
 * 
 * @description Express.js connection and routing all project 
 * Main function to setup Express application here
 * 
 */
import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import { mainRouter } from './init'
import cors from "cors"

export async function createApp(): Promise<express.Application> {
    const app = express();

    app.set('port', process.env.PORT);

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        credentials: true
    }));
    app.get('/', (req: Request, res: Response) => {
        return res.status(200).json({ message: '!You have successfully started the application!' });
    });

    app.use("/", mainRouter);

    return app;
}