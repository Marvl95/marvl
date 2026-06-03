async function fetchTodo(id = 1) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

  if (!response.ok) {
    throw new Error(`Todo request failed: ${response.status}`);
  }

  return response.json();
}

async function fetchUser(id = 1) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (!response.ok) {
    throw new Error(`User request failed: ${response.status}`);
  }

  return response.json();
}

let promiseAllResult;
let promiseRaceResult;

try {
  const [todo, user] = await Promise.all([fetchTodo(), fetchUser()]);
  promiseAllResult = { todo, user };
  console.log('Promise.all - todo:', todo);
  console.log('Promise.all - user:', user);
} catch (error) {
  console.error('Promise.all - помилка:', error.message);
}

try {
  promiseRaceResult = await Promise.race([fetchTodo(), fetchUser()]);
  console.log('Promise.race - перший результат:', promiseRaceResult);
} catch (error) {
  console.error('Promise.race - помилка:', error.message);
}
