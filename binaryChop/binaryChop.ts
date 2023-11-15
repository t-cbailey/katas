// http://codekata.com/kata/kata02-karate-chop/
//binary chop;
//take a sorted array and return the index of int

//** Version 1 - recursive **//

export function binaryChop(int: number, arr: number[]) {
  const midPoint = Math.floor(arr.length / 2);

  if (arr.length < 1) {
    return -1;
  }

  if (arr[midPoint] === int) {
    return midPoint;
  } else if (arr[midPoint] < int) {
    for (let i = midPoint; i < arr.length; i++) {
      if (arr[i] === int) return i;
    }
  } else {
    return binaryChop(int, arr.slice(0, midPoint));
  }
}

//** Version 2- looping  **//

// export function binaryChop(int: number, arr: number[]) {
//   let tempArr = [...arr];

//   while (tempArr.length > 0) {
//     const midPoint = Math.floor(tempArr.length / 2);

//     for (let i = midPoint; i < tempArr.length; i++) {
//       if (tempArr[i] === int) {
//         return i;
//       }
//     }
//     tempArr = tempArr.slice(0, midPoint);
//   }
//   return -1;
// }
