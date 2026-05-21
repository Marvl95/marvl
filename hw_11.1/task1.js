function printAfterDelay(text, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(text);
      resolve();
    }, ms);
  });
}

printAfterDelay('Текст зʼявився через 2 секунди.', 2000);
