import axios from 'axios';
import chalk from 'chalk';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { 'Content-Type': 'application/json' },
});

function logRequest(method, url) {
  const arrow = chalk.gray('→');
  const label =
    method === 'POST' ? chalk.magenta.bold(method) : chalk.cyan.bold(method);
  console.log(`${arrow} ${label} ${chalk.white(url)}`);
}

function logResponse(status, url) {
  const arrow = chalk.gray('←');
  const isSuccess = typeof status === 'number' && status >= 200 && status < 300;
  const statusText = isSuccess
    ? chalk.green.bold(String(status))
    : chalk.red.bold(String(status));
  console.log(`${arrow} ${statusText} ${chalk.dim(url)}`);
}

function logSuccess(message) {
  console.log(`${chalk.green('✓')} ${chalk.green(message)}`);
}

api.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase() ?? 'GET';
  const url = `${config.baseURL ?? ''}${config.url ?? ''}`;
  logRequest(method, url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    logResponse(response.status, response.config.url);
    return response;
  },
  (error) => {
    const status = error.response?.status ?? 'no response';
    logResponse(status, error.config?.url ?? '');
    return Promise.reject(error);
  },
);

function assertStatus(response, expectedStatus) {
  if (response.status !== expectedStatus) {
    throw new Error(`Expected status ${expectedStatus}, got ${response.status}`);
  }
}

async function getPostById(postId) {
  const response = await api.get(`/posts/${postId}`);

  assertStatus(response, 200);

  const { id, userId, title, body } = response.data;
  if (id !== postId || typeof userId !== 'number' || !title || !body) {
    throw new Error(`GET /posts/${postId}: invalid post shape`);
  }

  logSuccess(`GET /posts/${postId} — post verified`);
}

async function getUserById(userId) {
  const response = await api.get(`/users/${userId}`);

  assertStatus(response, 200);

  const { id, name, email, username } = response.data;
  if (id !== userId || !name || !email || !username) {
    throw new Error(`GET /users/${userId}: invalid user shape`);
  }

  logSuccess(`GET /users/${userId} — user verified`);
}

async function getCommentsForPost(postId) {
  const response = await api.get(`/posts/${postId}/comments`);

  assertStatus(response, 200);

  if (!Array.isArray(response.data) || response.data.length === 0) {
    throw new Error(`GET /posts/${postId}/comments: expected non-empty array`);
  }

  const first = response.data[0];
  if (first.postId !== postId || !first.email || !first.body) {
    throw new Error(`GET /posts/${postId}/comments: invalid comment shape`);
  }

  logSuccess(`GET /posts/${postId}/comments — ${response.data.length} comments verified`);
}

async function createPost(payload) {
  const response = await api.post('/posts', payload);

  assertStatus(response, 201);

  const { id, title, body, userId } = response.data;
  if (id !== 101 || title !== payload.title || body !== payload.body || userId !== payload.userId) {
    throw new Error('POST /posts: response data does not match sent payload');
  }

  logSuccess('POST /posts — created post verified (id 101)');
}

async function createTodo(payload) {
  const response = await api.post('/todos', payload);

  assertStatus(response, 201);

  const { id, title, completed, userId } = response.data;
  if (
    id !== 201 ||
    title !== payload.title ||
    completed !== payload.completed ||
    userId !== payload.userId
  ) {
    throw new Error('POST /todos: response data does not match sent payload');
  }

  logSuccess('POST /todos — created todo verified (id 201)');
}

async function runApiScenario() {
  const postId = 1;
  const userId = 1;

  console.log(chalk.bold.cyan('\nJSONPlaceholder — 5 requests\n'));

  await getPostById(postId);
  await getUserById(userId);
  await getCommentsForPost(postId);
  await createPost({
    title: 'HW 14.1 test post',
    body: 'Created via axios POST',
    userId,
  });
  await createTodo({
    title: 'Finish HW 14.1',
    completed: false,
    userId,
  });

  console.log(chalk.bold.green('\nAll requests passed verification.\n'));
}

runApiScenario().catch((error) => {
  console.error(chalk.red.bold(`\nFailed: ${error.message}\n`));
  process.exit(1);
});
