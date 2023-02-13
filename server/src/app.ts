import express, { Express } from 'express';
import { applicationStatus } from './routes/app.routes'; 
import { convertToText } from './routes/file.routes';
import fileHanlder from "./storage"; 
import authMiddleware from "./auth";

const app: Express = express();

app.get('/status', applicationStatus);
app.post('/convert-to-text', authMiddleware.authenticate('basic', { session: false }), fileHanlder.single('file'), convertToText());

export default app;