function fetchTodo() {
  return fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
    if (!response.ok) {
      throw new Error(`Todo request failed: ${response.status}`);
    }

    return response.json();
  });
}

function fetchUser() {
  return fetch('https://jsonplaceholder.typicode.com/users/1').then((response) => {
    if (!response.ok) {
      throw new Error(`User request failed: ${response.status}`);
    }

    return response.json();
  });
}

let promiseAllResult;
let promiseRaceResult;

Promise.all([fetchTodo(), fetchUser()])
  .then(([todo, user]) => {
    promiseAllResult = { todo, user };
    console.log('Promise.all - todo:', todo);
    console.log('Promise.all - user:', user);
  })
  .catch((error) => {
    console.error('Promise.all - помилка:', error.message);
  });

Promise.race([fetchTodo(), fetchUser()])
  .then((result) => {
    promiseRaceResult = result;
    console.log('Promise.race - перший результат:', result);
  })
  .catch((error) => {
    console.error('Promise.race - помилка:', error.message);
  });
