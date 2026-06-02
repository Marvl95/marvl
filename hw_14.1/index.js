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

async function request1_getPostById() {
  const response = await api.get('/posts/1');

  assertStatus(response, 200);

  const { id, userId, title, body } = response.data;
  if (id !== 1 || typeof userId !== 'number' || !title || !body) {
    throw new Error('GET /posts/1: invalid post shape');
  }

  logSuccess('GET /posts/1 — post verified');
}

async function request2_getUserById() {
  const response = await api.get('/users/1');

  assertStatus(response, 200);

  const { id, name, email, username } = response.data;
  if (id !== 1 || !name || !email || !username) {
    throw new Error('GET /users/1: invalid user shape');
  }

  logSuccess('GET /users/1 — user verified');
}

async function request3_getCommentsForPost() {
  const response = await api.get('/posts/1/comments');

  assertStatus(response, 200);

  if (!Array.isArray(response.data) || response.data.length === 0) {
    throw new Error('GET /posts/1/comments: expected non-empty array');
  }

  const first = response.data[0];
  if (first.postId !== 1 || !first.email || !first.body) {
    throw new Error('GET /posts/1/comments: invalid comment shape');
  }

  logSuccess(`GET /posts/1/comments — ${response.data.length} comments verified`);
}

async function request4_postNewPost() {
  const payload = {
    title: 'HW 14.1 test post',
    body: 'Created via axios POST',
    userId: 1,
  };

  const response = await api.post('/posts', payload);

  assertStatus(response, 201);

  const { id, title, body, userId } = response.data;
  if (id !== 101 || title !== payload.title || body !== payload.body || userId !== payload.userId) {
    throw new Error('POST /posts: response data does not match sent payload');
  }

  logSuccess('POST /posts — created post verified (id 101)');
}

async function request5_postNewTodo() {
  const payload = {
    title: 'Finish HW 14.1',
    completed: false,
    userId: 1,
  };

  const response = await api.post('/todos', payload);

  assertStatus(response, 201);

  const { id, title, completed, userId } = response.data;
  if (id !== 201 || title !== payload.title || completed !== false || userId !== 1) {
    throw new Error('POST /todos: response data does not match sent payload');
  }

  logSuccess('POST /todos — created todo verified (id 201)');
}

async function runApiScenario() {
  console.log(chalk.bold.cyan('\nJSONPlaceholder — 5 requests\n'));

  await request1_getPostById();
  await request2_getUserById();
  await request3_getCommentsForPost();
  await request4_postNewPost();
  await request5_postNewTodo();

  console.log(chalk.bold.green('\nAll requests passed verification.\n'));
}

runApiScenario().catch((error) => {
  console.error(chalk.red.bold(`\nFailed: ${error.message}\n`));
  process.exit(1);
});
