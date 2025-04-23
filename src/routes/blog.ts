import express from 'express';
import pool from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM posts');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  console.log('Received body:', req.body); // Debug 
  const { title, content } = req.body;

  const result = await pool.query(
    'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  res.status(201).json(result.rows[0]);
});


router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



export default router;
