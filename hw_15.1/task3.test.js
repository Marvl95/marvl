import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { faker } from '@faker-js/faker';
import axios, { AxiosError } from 'axios';
import { fetchPostById } from './task3.js';

function createAxiosError(statusCode) {
  return new AxiosError(
    `Request failed with status code ${statusCode}`,
    AxiosError.ERR_BAD_REQUEST,
    {},
    {},
    {
      status: statusCode,
      statusText: 'Error',
      headers: {},
      data: {},
      config: {},
    },
  );
}

describe('fetchPostById - mocked axios requests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('returns post data when request succeeds', async () => {
    const postId = faker.number.int({ min: 1, max: 100 });
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const mockPost = {
      id: postId,
      userId: faker.number.int({ min: 1, max: 10 }),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
    };

    const mockGet = jest.spyOn(axios, 'get').mockResolvedValue({
      status: 200,
      data: mockPost,
    });

    const result = await fetchPostById(postId);

    expect(mockGet).toHaveBeenCalledWith(url);
    expect(result).toEqual({
      success: true,
      data: mockPost,
      statusCode: 200,
    });
  });

  test('returns error result when request fails with 404', async () => {
    const postId = 999;
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    const mockGet = jest
      .spyOn(axios, 'get')
      .mockRejectedValue(createAxiosError(404));

    const result = await fetchPostById(postId);

    expect(mockGet).toHaveBeenCalledWith(url);
    expect(result.success).toBe(false);
    expect(result.statusCode).toBe(404);
    expect(result.message).toBe('Request failed with status code 404');
  });

  test('returns error result when request fails with 500', async () => {
    const postId = faker.number.int({ min: 1, max: 100 });
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    const mockGet = jest
      .spyOn(axios, 'get')
      .mockRejectedValue(createAxiosError(500));

    const result = await fetchPostById(postId);

    expect(mockGet).toHaveBeenCalledWith(url);
    expect(result.success).toBe(false);
    expect(result.statusCode).toBe(500);
    expect(result.message).toBe('Request failed with status code 500');
  });
});
