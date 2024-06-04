interface Cat {
  name: string;
  breed: string;
}

/* type ReadOnlyCat = {
    readonly name: string;
    readonly breed: string;
} */

function makeCat(name: string, breed: string): Readonly<Cat> {
  return {
    name,
    breed,
  };
}

const usul = makeCat("Usul", "Tabby");
//usul.name = "Piter";

function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}

const c1 = makeCoordinate(10, 20, 30);
//c1[0] = 50

const reallyConstant = [1, 2, 3] as const; //event the contents are constant
//reallyConstant[0] = 98
