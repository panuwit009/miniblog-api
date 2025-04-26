import express from 'express';
import blogRoutes from './routes/blog';
import blogApi from './misc';

const app = express();

app.use(express.json());
app.use(blogApi, blogRoutes);

export default app; 
