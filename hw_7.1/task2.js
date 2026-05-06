function recursiveCounter(num) {
  if (num <= 0) {
    return;
  }

  console.log(num);
  recursiveCounter(num - 1);
}

recursiveCounter(5);

