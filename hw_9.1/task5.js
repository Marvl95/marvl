const users = [
  { name: 'Olena', email: 'olena@example.com', age: 22, city: 'Kyiv', role: 'Developer' },
  { name: 'Andrii', email: 'andrii@example.com', age: 31, role: 'QA', experience: 5 },
  { name: 'Maria', email: 'maria@example.com', age: 27, city: 'Lviv', hobby: 'reading' },
];

for (const { name, email, age, ...rest } of users) {
  console.log('name:', name, 'email:', email, 'age:', age, 'other:', rest);
}
