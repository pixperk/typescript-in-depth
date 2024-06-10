type ProcessedInput<T> = T extends string
  ? number
  : T extends any[]
  ? number
  : null;

function processInput<T>(input: T): ProcessedInput<T> {
  if (typeof input === 'string') {
    return input.length as ProcessedInput<T>;
  } else if (Array.isArray(input)) {
    return input.length as ProcessedInput<T>;
  } else {
    return null as ProcessedInput<T>;
  }
}

// Usage examples
const stringResult = processInput('hello'); // type: number
const arrayResult = processInput([1, 2, 3]); // type: number
const otherResult = processInput(42); // type: null

console.log(stringResult); // Output: 5
console.log(arrayResult); // Output: 3
console.log(otherResult); // Output: null
