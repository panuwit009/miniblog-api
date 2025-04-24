import request from 'supertest';
import app from '../app';
import pool from '../db';
import blogApi from '../apiPath';

beforeEach(async () => {
  await pool.query('DELETE FROM posts');
});

describe(`GET ${blogApi}`, () => {
  it('should return all posts on GET ', async () => {
    const response = await request(app).get(blogApi);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe(`POST ${blogApi}`, () => {
  let newPostId: number;

  it('should create a new post and be retrievable by GET', async () => {
    const newPost = { title: 'Test Post', content: 'Test content' };

    const postRes = await request(app).post(blogApi).send(newPost);
    expect(postRes.status).toBe(201);
    expect(postRes.body.title).toBe(newPost.title);
    expect(postRes.body.content).toBe(newPost.content);

    newPostId = postRes.body.id;

    const getRes = await request(app).get(blogApi);
    expect(getRes.body.some((p: { id: number; }) => p.id === newPostId)).toBe(true);
  });

  it('should return 400 if title is missing', async () => {
    const res = await request(app).post(blogApi).send({ content: 'No title' });
    expect(res.status).toBe(400);
  });
});

afterAll(async () => {
  await pool.end();
});