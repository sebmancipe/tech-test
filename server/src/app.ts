import express, { Express } from 'express';
import { applicationStatus } from './routes/app.routes'; 
import { convertToText } from './routes/file.routes';
import fileHanlder from "./storage"; 

const app: Express = express();

app.get('/', applicationStatus);
app.post('/convert-to-text', fileHanlder.single('file'), convertToText());

export default app;