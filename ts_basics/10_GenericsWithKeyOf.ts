function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((i) => i[key]);
}

const dogs = [
  { name: "Buddy", age: 3 },
  { name: "Max", age: 5 },
  { name: "Charlie", age: 2 },
  { name: "Bella", age: 4 },
  { name: "Lucy", age: 6 },
];

console.log(pluck(dogs, "age"));
console.log(pluck(dogs, "name"));

//Event Map

interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productId: string };
  checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
): void {
  console.log([name, data]);
}

sendEvent("addToCart", {
  productId: "foo",
  user: "baz",
  quantity: 1,
  time: 10,
});

sendEvent("checkout", {
  user:"bob",
  time: 10,
});
