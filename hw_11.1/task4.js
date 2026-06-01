class TodoApi {
  constructor(baseUrl = 'https://jsonplaceholder.typicode.com/todos') {
    this.baseUrl = baseUrl;
  }

  async fetchTodo(id = 1) {
    const response = await fetch(`${this.baseUrl}/${id}`);

    if (!response.ok) {
      throw new Error(`Todo request failed: ${response.status}`);
    }

    return response.json();
  }
}

class UserApi {
  constructor(baseUrl = 'https://jsonplaceholder.typicode.com/users') {
    this.baseUrl = baseUrl;
  }

  async fetchUser(id = 1) {
    const response = await fetch(`${this.baseUrl}/${id}`);

    if (!response.ok) {
      throw new Error(`User request failed: ${response.status}`);
    }

    return response.json();
  }
}

const todoApi = new TodoApi();
const userApi = new UserApi();

let promiseAllResult;
let promiseRaceResult;

try {
  const [todo, user] = await Promise.all([todoApi.fetchTodo(), userApi.fetchUser()]);
  promiseAllResult = { todo, user };
  console.log('Promise.all - todo:', todo);
  console.log('Promise.all - user:', user);
} catch (error) {
  console.error('Promise.all - помилка:', error.message);
}

try {
  promiseRaceResult = await Promise.race([todoApi.fetchTodo(), userApi.fetchUser()]);
  console.log('Promise.race - перший результат:', promiseRaceResult);
} catch (error) {
  console.error('Promise.race - помилка:', error.message);
}
