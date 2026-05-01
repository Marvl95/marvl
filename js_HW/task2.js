const averageGrade = Math.round(Math.random() * 100);

let level;

switch (true) {
  case averageGrade < 60:
    level = 'Незадовільно';
    break;
  case averageGrade <= 70:
    level = 'Задовільно';
    break;
  case averageGrade <= 80:
    level = 'Добре';
    break;
  case averageGrade <= 90:
    level = 'Дуже добре';
    break;
  default:
    level = 'Відмінно';
}

console.log('Оцінка:', averageGrade);
console.log('Рівень:', level);
