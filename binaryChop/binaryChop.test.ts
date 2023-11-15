import { binaryChop } from "./binaryChop";
import { generator } from "./input";

describe("binary chop", () => {
  describe("basic", () => {
    test("should return an integer ", () => {
      expect(typeof binaryChop(5, [1, 2, 3, 4, 5])).toBe("number");
    });
    test("should return -1 if int not found", () => {
      expect(binaryChop(2, [3, 4, 5])).toBe(-1);
    });
    test("should find the correct index in an array with length 2", () => {
      expect(binaryChop(1, [1, 2])).toBe(0);
      expect(binaryChop(2, [1, 2])).toBe(1);
    });
    test("should find the correct index in odd length arrays", () => {
      expect(binaryChop(2, [1, 2, 3, 4, 5])).toBe(1);
      expect(binaryChop(5, [1, 2, 3, 4, 5])).toBe(4);
      expect(binaryChop(3, [1, 2, 3, 4, 5])).toBe(2);
    });
    test("should find the correct index in even length arrays", () => {
      expect(binaryChop(2, [1, 2, 3, 4, 5, 6])).toBe(1);
      expect(binaryChop(5, [1, 2, 3, 4, 5, 6])).toBe(4);
      expect(binaryChop(3, [1, 2, 3, 4, 5, 6])).toBe(2);
    });
    test("edge cases and mixed lengths", () => {
      expect(binaryChop(55, generator(5, 1000))).toBe(50);
      expect(binaryChop(4000, generator(0, 5000))).toBe(4000);
      expect(binaryChop(10, [5, 6, 7, 8, 10, 22])).toBe(4);
      expect(binaryChop(5986, generator(0, 10000))).toBe(5986);
    });
  });
  describe("purity", () => {
    test("should not mutuate input", () => {
      const int = 1;
      const arr = [1, 2];
      expect(binaryChop(int, arr)).not.toBe(int);
      expect(binaryChop(int, arr)).not.toBe(arr);
      binaryChop(int, arr);
      expect(arr).toEqual([1, 2]);
      expect(int).toEqual(1);
    });
  });
});
