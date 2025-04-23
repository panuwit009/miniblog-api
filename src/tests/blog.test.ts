import request from 'supertest';
import app from '../app';
import pool from '../db';
import blogApi from '../apiPath';

describe('Blog API', () => {
  it('should return all posts on GET /api/blog', async () => {
    const response = await request(app).get(blogApi);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new post on POST /api/blog', async () => {
    const newPost = {
      title: 'Test Post',
      content: 'This is a test post'
    };

    const response = await request(app).post(blogApi).send(newPost);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newPost.title);
    expect(response.body.content).toBe(newPost.content);
  });

  afterAll(async () => {
    await pool.end();
    console.log('Closed database connection');
  });
});
