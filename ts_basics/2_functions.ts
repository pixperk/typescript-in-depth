function addNumbers(a: number, b: number): number {
  //any type and return type
  return a + b;
}

export default addNumbers;

export const addStrings = (str1: string, str2: string): string => {
  return `${str1}${str2}`;
};

export const format = (title: string, param: string | number): string => {
  return `${title} ${param}`;
};

//void function
export const printFormat = (title: string, param: string | number): void => {
  console.log(format(title, param));
};

//promise function
export const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`Data from ${url}`);

function introduce(salutation: string, ...names: string[]): string {
  return `${salutation} ${names.join(" ")}`;
}

//Typescript does not enforce types at runtime

export function getName(user: { first: string; last: string }): string {
  return `${user?.first ?? 'Jane'} ${user?.last ?? 'Wilson'}`;//no runtime typechecking and only compile time typechecking
}
