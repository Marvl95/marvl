function handleNum(number, handleEven, handleOdd) {
  if (number % 2 === 0) {
    handleEven();
  } else {
    handleOdd();
  }
}

function handleEven() {
  console.log('number is even');
}

function handleOdd() {
  console.log('number is odd');
}

const randomNumber = Math.floor(Math.random() * 10);

console.log('Random number:', randomNumber);
handleNum(randomNumber, handleEven, handleOdd);