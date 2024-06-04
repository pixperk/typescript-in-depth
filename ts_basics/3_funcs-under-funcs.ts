export function printToFIle(text: string, callback: () => void): void {
  console.log(text);
  callback();
}


export function arrayMutate(
  numbers: number[],
  mutate: (v: number) => number
): number[] {
  return numbers.map(mutate);
}

console.log(arrayMutate([1, 2, 3], (v) => v * 10));

export type MutationFunction = (v: number) => number

function arrayMutate2(
    numbers: number[],
    mutate:MutationFunction
  ): number[] {
    return numbers.map(mutate);
  }

  console.log(arrayMutate2([1, 2, 3], (v) => v * 200));

  const myNewMutateFunc : MutationFunction = (v:number) => v*100
 
  export type AdderFunction = (val: number) => number

  export function adderClosure(num:number):AdderFunction{
    return (val:number) => num+ val;
  }

  const addOne = adderClosure(1)
  console.log(addOne(2));
  
  const addTwoNumbers = adderClosure(3)(6)
  console.log(addTwoNumbers);
  