import express, { Express } from 'express';
import { applicationStatus } from './src/routes/app.routes';
import { convertToText } from './src/routes/file.routes';

const app: Express = express();
const port = process.env.PORT ?? 8080;

app.get('/', applicationStatus);
app.get('/convert-to-text', convertToText());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});