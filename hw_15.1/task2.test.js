import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { getWithHeadersAndParams } from './task2.js';

describe('getWithHeadersAndParams', () => {
  const url = 'https://httpbin.org/get';
  const params = {
    search: faker.lorem.word(),
    page: faker.number.int({ min: 1, max: 100 }),
  };
  const headers = {
    'X-Custom-Token': faker.string.uuid(),
    'X-Request-Source': faker.internet.username(),
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('sends custom query params in the request', async () => {
    const mockGet = jest.spyOn(axios, 'get').mockResolvedValue({
      status: 200,
      data: {},
    });

    await getWithHeadersAndParams(url, params, headers);

    expect(mockGet).toHaveBeenCalledWith(url, {
      params,
      headers,
    });
    expect(mockGet.mock.calls[0][1].params).toEqual(params);
  });

  test('sends custom headers in the request', async () => {
    const mockGet = jest.spyOn(axios, 'get').mockResolvedValue({
      status: 200,
      data: {},
    });

    await getWithHeadersAndParams(url, params, headers);

    expect(mockGet.mock.calls[0][1].headers).toEqual(headers);
    expect(mockGet.mock.calls[0][1].headers['X-Custom-Token']).toBe(
      headers['X-Custom-Token'],
    );
    expect(mockGet.mock.calls[0][1].headers['X-Request-Source']).toBe(
      headers['X-Request-Source'],
    );
  });
});
