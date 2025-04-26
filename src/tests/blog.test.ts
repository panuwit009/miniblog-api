import request from 'supertest';
import app from '../app';
import pool from '../db';
import { blogApi, testPost } from '../misc';

beforeEach(async () => {
  await pool.query('DELETE FROM posts');
});

afterAll(async () => {
  await pool.end();
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
    const postRes = await request(app).post(blogApi).send(testPost);
    expect(postRes.status).toBe(201);
    expect(postRes.body.title).toBe(testPost.title);
    expect(postRes.body.content).toBe(testPost.content);

    newPostId = postRes.body.id;

    const getRes = await request(app).get(blogApi);
    expect(getRes.body.some((p: { id: number; }) => p.id === newPostId)).toBe(true);
  });

  it('should return 400 if title is missing', async () => {
    const res = await request(app).post(blogApi).send({ content: 'No title' });
    expect(res.status).toBe(400);
  });
});

describe(`DELETE ${blogApi}`, () => {
  it("should delete and fetch deleted id to confirm that post doesn't exist", async () => {
    const created = await request(app).post(blogApi).send(testPost);

    const deleteRes = await request(app).delete(`${blogApi}/${created.body.id}`);
    expect(deleteRes.status).toBe(204);

    const getRes = await request(app).get(`${blogApi}/${created.body.id}`);
    expect(getRes.status).toBe(404);
  });
});

describe(`PUT ${blogApi}`, () =>{
  it('should update posts on PUT', async () => {
    const created = await request(app).post(blogApi).send(testPost);

    const updatedData = { title: 'Updated', content: 'Updated' };
    const putRes =await request(app).put(`${blogApi}/${created.body.id}`)
    .send(updatedData);

    expect(putRes.status).toBe(200);
    expect(putRes.body.id).toBe(created.body.id);
    expect(putRes.body.title).toBe(updatedData.title);
    expect(putRes.body.content).toBe(updatedData.content);

    const getRes = await request(app).get(`${blogApi}/${created.body.id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.title).toBe(updatedData.title);
    expect(getRes.body.content).toBe(updatedData.content);
  });

  it('should return 404 if post not found', async () => {
    const putRes = await request(app)
      .put(`${blogApi}/6544`)
      .send({ title: 'Does not exist', content: 'Still does not exist' });

    expect(putRes.status).toBe(404);
    expect(putRes.body.error).toBe('Post not found');
  });

  it('should return 400 if missing title or content', async () => {
    const created = await request(app).post(blogApi).send(testPost);

    const putRes = await request(app)
      .put(`${blogApi}/${created.body.id}`)
      .send({ title: '' });

    expect(putRes.status).toBe(400);
    expect(putRes.body.error).toBe('Missing title or content');
  });
});