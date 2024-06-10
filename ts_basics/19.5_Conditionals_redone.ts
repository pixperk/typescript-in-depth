// Function overloads
function processInput<T extends string>(input: T): number;
function processInput<T extends any[]>(input: T): number;
function processInput<T>(input: T): null;

// Implementation
function processInput<T>(input: T): number | null {
  if (typeof input === 'string') {
    return input.length;
  } else if (Array.isArray(input)) {
    return input.length;
  } else {
    return null;
  }
}

// Usage examples
const stringResult = processInput('hello'); // type: number
const arrayResult = processInput([1, 2, 3]); // type: number
const otherResult = processInput(42); // type: null

console.log(stringResult); // Output: 5
console.log(arrayResult); // Output: 3
console.log(otherResult); // Output: null
