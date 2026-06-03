import axios from 'axios';

export async function fetchPostById(postId) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  try {
    const response = await axios.get(url);

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
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
