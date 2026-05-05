const averageGrade = Math.round(Math.random() * 100);

let level;

if (averageGrade < 60) {
  level = 'Незадовільно';
} else if (averageGrade <= 70) {
  level = 'Задовільно';
} else if (averageGrade <= 80) {
  level = 'Добре';
} else if (averageGrade <= 90) {
  level = 'Дуже добре';
} else {
  level = 'Відмінно';
}

console.log('Оцінка:', averageGrade);
console.log('Рівень:', level);
