type MyFlexibleDogInfo = {
  name: string;
} & Record<string, string | number>;

const dog: MyFlexibleDogInfo = {
  name: "LG",
  breed: "Mutt",
  age: 22,
};

//Another way without record
type MyFlexibleDogInfo2 = {
  name: string;
  [key: string]: string | number;
};

const dog2: MyFlexibleDogInfo2 = {
  name: "Tom",
  breed: "Pomeranian",
  age: 7,
};

interface DogInfo {
  name: string;
  age: number;
}

/* Mapped types in TypeScript provide a way to create new types by transforming properties of an existing type. This transformation is done by iterating over the keys of the original type and applying specific transformations to each key and its corresponding value type. Mapped types are useful for scenarios where you need to create a type based on the structure of another type, with modifications. */

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type DogInfoOptions = OptionsFlags<DogInfo>;
/* type DogInfoOptions = {
    name: boolean;
    age: boolean;
} */

type Listeners<Type> = {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]: (
    newvalue: Type[Property]
  ) => void;
} & {
  [Property in keyof Type as `on${Capitalize<
    string & Property
  >}Delete`]?: () => void;
};

function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
  throw "Needs to be implemented";
}

const lg: DogInfo = {
  name: "LG",
  age: 13,
};

type DogInfoListeners = Listeners<DogInfo>;

// The resulting type will be:
// type DogInfoListeners = {
//   onNameChange: (newValue: string) => void;
//   onAgeChange: (newValue: number) => void;
//   onNameDelete?: () => void;
//   onAgeDelete?: () => void;
// }

listenToObject(lg, {
  onNameChange: (v: string) => {},
  onAgeChange: (v: number) => {},
  onAgeDelete: () => {},
});
