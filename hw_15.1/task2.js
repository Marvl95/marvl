import axios from 'axios';

export async function getWithHeadersAndParams(url, params, headers) {
  return axios.get(url, { params, headers });
}
