export function isPerfectNumber(n) {
  if (n <= 1) return false;

  let sum = 1;
  const lim = Math.sqrt(n);

  for (let i = 2; i <= lim; ++i) {
    if (n % i === 0) {
      sum += i;
      sum += n / i;
    }
  }
  return sum === n;
}
