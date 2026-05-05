function divide(numerator, denominator) {
  if (typeof numerator !== 'number' || typeof denominator !== 'number' || Number.isNaN(numerator) || Number.isNaN(denominator)) {
    throw new Error('Both numerator and denominator must be valid numbers.');
  }

  if (denominator === 0) {
    throw new Error('Denominator must not be 0.');
  }

  return numerator / denominator;
}

try {
  console.log('10 / 2 =', divide(10, 2));
} catch (error) {
  console.log('Error:', error.message);
} finally {
  console.log('Робота завершена');
}

try {
  console.log('8 / 0 =', divide(8, 0));
} catch (error) {
  console.log('Error:', error.message);
} finally {
  console.log('Робота завершена');
}

try {
  console.log('5 / "a" =', divide(5, 'a'));
} catch (error) {
  console.log('Error:', error.message);
} finally {
  console.log('Робота завершена');
}
