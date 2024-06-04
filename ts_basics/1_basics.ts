let user: string = "Yashaswi";
let LoggedIn: boolean = true;

user += " Mishra";

console.log(user);

let myNumber: number = 10;

const names: string[] = user.split(" ");

const myValues: Array<number> = [1, 2, 3];

const myPerson: {
  first: string;
  last: string;
  cool: boolean;
} = {
  first: "Yashaswi",
  last: "Mishra",
  cool: true,
};

interface Person{
    first: string;
    last: string;
    cool: boolean;
}

const myPerson2  : Person ={
    first: "Billy",
    last: "Gates",
    cool: true,
}

const ids : Record<number, string> = {
    10:"a",
    20: "b"
}

ids[30] = "c"



