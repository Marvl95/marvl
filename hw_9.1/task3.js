const car1 = {
  brand: 'Toyota',
  model: 'Camry',
  year: 2023,
};

const car2 = {
  brand: 'BMW',
  model: 'X5',
  owner: 'Thomas Shelby',
};

const car3 = {
  ...car1,
  ...car2,
};

console.log(car3);
