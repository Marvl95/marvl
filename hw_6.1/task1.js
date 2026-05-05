function getRectangleAreaDeclaration(width, height) {
  return width * height;
}

const getRectangleAreaExpression = function (width, height) {
  return width * height;
};

const getRectangleAreaArrow = (width, height) => width * height;

console.log('Function declaration:', getRectangleAreaDeclaration(3, 8));
console.log('Function expression:', getRectangleAreaExpression(3, 8));
console.log('Arrow function:', getRectangleAreaArrow(3, 8));
