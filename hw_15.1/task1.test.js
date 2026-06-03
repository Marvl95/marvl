import { requestInvalidUrl } from './task1.js';

describe('Task 1 — error handling with axios', () => {
  const invalidUrl = 'https://jsonplaceholder.typicode.com/invalid-endpoint-404';

  test('returns error result for invalid URL', async () => {
    const result = await requestInvalidUrl(invalidUrl);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Request failed with status code 404');
    expect(result.statusCode).toBe(404);
  });

  test('error message is a non-empty string', async () => {
    const result = await requestInvalidUrl(invalidUrl);

    expect(typeof result.message).toBe('string');
    expect(result.message.length).toBeGreaterThan(0);
  });
});
