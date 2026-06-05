import {
  createPost,
  createTodo,
  getCommentsForPost,
  getPostById,
  getUserById,
} from './api.js';

describe('JSONPlaceholder API', () => {
  const postId = 1;
  const userId = 1;

  test('GET /posts/:postId returns post with expected fields', async () => {
    const response = await getPostById(postId);

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      id: postId,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
    expect(response.data.title.length).toBeGreaterThan(0);
    expect(response.data.body.length).toBeGreaterThan(0);
  });

  test('GET /users/:userId returns user with expected fields', async () => {
    const response = await getUserById(userId);

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      id: userId,
      name: expect.any(String),
      email: expect.any(String),
      username: expect.any(String),
    });
  });

  test('GET /posts/:postId/comments returns non-empty comments array', async () => {
    const response = await getCommentsForPost(postId);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0]).toMatchObject({
      postId,
      email: expect.any(String),
      body: expect.any(String),
    });
  });

  test('POST /posts creates post and echoes payload', async () => {
    const payload = {
      title: 'HW 14.1 test post',
      body: 'Created via axios POST',
      userId,
    };

    const response = await createPost(payload);

    expect(response.status).toBe(201);
    expect(response.data).toMatchObject({
      id: 101,
      title: payload.title,
      body: payload.body,
      userId: payload.userId,
    });
  });

  test('POST /todos creates todo and echoes payload', async () => {
    const payload = {
      title: 'Finish HW 14.1',
      completed: false,
      userId,
    };

    const response = await createTodo(payload);

    expect(response.status).toBe(201);
    expect(response.data).toMatchObject({
      id: 201,
      title: payload.title,
      completed: payload.completed,
      userId: payload.userId,
    });
  });
});
