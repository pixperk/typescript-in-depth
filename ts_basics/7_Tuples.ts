/* In TypeScript, a tuple is a type of array with a fixed number of elements, where each element can have a specific type. Tuples allow you to define the structure of an array by specifying the types and order of its elements. This is particularly useful when you need a fixed-size array where the position and type of each element is known and important. */


type ThreeDCoordinate = [x: number, y: number, z: number];

function add3DCoordinates(
  c1: ThreeDCoordinate,
  c2: ThreeDCoordinate
): ThreeDCoordinate {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
}

console.log(add3DCoordinates([1, 3, 4], [10, 20, 20]));

//illustration of useState in React

function simpleStringState(
  initial: string
): [() => string, (v: string) => void] {
  let str: string = initial;
  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
}

const [str1getter, str1setter] = simpleStringState("Hello") //destructuring returned array
console.log(str1getter());
str1setter("Goodbye")
console.log(str1getter());

const[string, setString] = simpleStringState("Wow")
console.log(string());
setString("Eww")
console.log(string());


