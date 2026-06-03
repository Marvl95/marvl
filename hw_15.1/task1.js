import axios from 'axios';

export async function requestInvalidUrl(
  invalidUrl = 'https://jsonplaceholder.typicode.com/invalid-endpoint-404',
) {
  try {
    const response = await axios.get(invalidUrl);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    const statusCode = error.response?.status ?? null;
    const message =
      statusCode != null
        ? `Request failed with status code ${statusCode}`
        : `Network error: ${error.message}`;

    return {
      success: false,
      message,
      statusCode,
    };
  }
}
