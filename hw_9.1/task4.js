const person = {
  firstName: 'Anna',
  lastName: 'Shevchenko',
  age: 28,
};

person.email = 'anna.shevchenko@example.com';
delete person.age;

console.log(person);
