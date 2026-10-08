export function isPerfectNumber(n) {
  if (n <= 1 || !Number.isInteger(n)) {
    return false;
  }

  let sum = 1;
  const lim = Math.floor(sqrt(n));

  for (let i = 2; i <= lim; ++i) {
    if (n % i === 0) {
      sum += i;
      const pair = n / i;
      if (pair !== i && pair !== n) {
        sum += pair;
      }
    }
  }
  return sum === n;
}
