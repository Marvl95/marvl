import axios from 'axios';
import chalk from 'chalk';

export const api = axios.create({
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

export async function getPostById(postId) {
  return api.get(`/posts/${postId}`);
}

export async function getUserById(userId) {
  return api.get(`/users/${userId}`);
}

export async function getCommentsForPost(postId) {
  return api.get(`/posts/${postId}/comments`);
}

export async function createPost(payload) {
  return api.post('/posts', payload);
}

export async function createTodo(payload) {
  return api.post('/todos', payload);
}
