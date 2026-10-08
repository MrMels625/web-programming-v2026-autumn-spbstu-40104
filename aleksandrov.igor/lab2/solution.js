export function isPerfectNumber(n) {
  if (n <= 1) return false;

  let sum = 1;
  const lim = Math.floor(sqrt(n));

  for (let i = 2; i <= lim; ++i) {
    if (n % i === 0) {
      sum += i;
      const pair = n / i;
      if (pair != i) {
        sum += pair;
      }
    }
  }
  return sum === n;
}
