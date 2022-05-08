import express from 'express'
import cors from 'cors';
import { routes } from './routes';

const app = express();

app.use(cors()) //será usado para integrar com o front-end
app.use(express.json());
app.use(routes)

app.listen(3333, () => {
    console.log('HTTP server running on port 3333')
})