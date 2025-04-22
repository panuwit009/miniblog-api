import express from 'express';
import blogRoutes from './routes/blog';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/blog', blogRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
