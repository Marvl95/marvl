class TodoApi {
  constructor(url = 'https://jsonplaceholder.typicode.com/todos/1') {
    this.url = url;
  }

  async fetchTodo() {
    const response = await fetch(this.url);

    if (!response.ok) {
      throw new Error(`Todo request failed: ${response.status}`);
    }

    return response.json();
  }
}

class UserApi {
  constructor(url = 'https://jsonplaceholder.typicode.com/users/1') {
    this.url = url;
  }

  async fetchUser() {
    const response = await fetch(this.url);

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
