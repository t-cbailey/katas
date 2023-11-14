export function generator(start, length) {
  const arr = [];
  for (let i = start; i < length; i++) {
    arr.push(i);
  }
  return arr;
}
