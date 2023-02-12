import dotenv from 'dotenv';
import app from './src/app';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT ?? 8080;
app.use(cors());

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});