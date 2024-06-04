interface MyUser {
  name: string;
  id: number;
  email?: string;
  phone?: string;
}

/* interface MyUserOptionals {
  name?: string;
  id?: string;
  email?: string;
  phone?:string
} */

type MyUserOptionals = Partial<MyUser>; //All fields are optional

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge(
    {
      name: "Yash",
      id: 1,
      email: "foo@baz.com",
    },
    {
      email: "ts@js.com",
    }
  )
);

type RequiredMyUser = Required<MyUser>; //All fields are required

/* type RequiredMyUser = {
    name: string;
    id: string;
    email: string;
    phone: string;
} */

type JustEmailAndName = Pick<
  MyUser,
  "email" | "name"
>; /* Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type. */

/* type JustEmailAndName = {
    name: string;
    email?: string | undefined;
} */

/* The Record utility type in TypeScript is used to construct an object type whose keys are a set of specific keys (e.g., strings or numbers) and whose values are of a specific type. It is defined as Record<K, T>, where K is the type of the keys, and T is the type of the values. */

type UserWithoutId = Omit<MyUser, "id">

const mapById = (users: MyUser[]): Record<MyUser["id"], UserWithoutId > => {

  return users.reduce((a, v) => {
    const {id, ...other} = v
    return { ...a, [id]: other };
  }, {});
};

/* the square bracket notation [id] within an object literal is used to define a computed property name.  */

console.log(
  mapById([
    {
      id: 1,
      name: "Mr. Foo",
    },
    {
      id: 2,
      name: "Mrs. Baz",
    },
  ])
);
