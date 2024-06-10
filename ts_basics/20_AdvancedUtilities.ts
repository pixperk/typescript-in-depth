type Name = {
  first: string;
  last: string;
};

function generateFullName(name: Name): Name & {
  fullName: string;
} {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}

function permuteRows<T extends (...args: any[]) => any>(   //(...args: any[]) : function
  iteratorFunc: T,
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return data.map((item)=>iteratorFunc(item));
}

console.log(
  permuteRows(generateFullName, [
    { first: "Yashaswi", last: "Mishra" },
    { first: "John", last: "Doe" },
  ])
);

class PersonWithFullName{
    constructor(public name: Name){

    }
    get fullName(){
        return `${this.name.first} ${this.name.last}`
    }
}

function createObjects<T extends new (...args: any[]) => any>(ObjectType : T, data:ConstructorParameters<T>[0][]) //new(...args: any[]) : instance
: InstanceType<T>[]{
    return data.map(item => new ObjectType(item))
}
    const twins = createObjects(PersonWithFullName, [
      { first: "Takuma", last: "Mamizuka" },
      { first: "Kazuma", last: "Mamizuka" },
    ])

    console.log(twins.map((obj)=>obj.fullName));
    