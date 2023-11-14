// http://codekata.com/kata/kata02-karate-chop/
//binary chop;
//take a sorted array and return the index of int

export function binaryChop(int: number, arr: number[]) {
  const midPoint = Math.floor(arr.length / 2);
  let result;

  if (arr.length < 1) {
    result = -1;
    return result;
  }

  if (arr[midPoint] === int) {
    result = midPoint;
  } else if (arr[midPoint] < int) {
    for (let i = midPoint; i < arr.length; i++) {
      if (arr[i] === int) result = i;
    }
  } else {
    return binaryChop(int, arr.slice(0, midPoint));
  }

  return result;
}
