function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let val: T = initial; //infers Generic type from intial value
  return [
    () => val,
    (v: T) => {
      val = v;
    },
  ];
}

const [state, setState] = simpleState(10);
console.log(state());
setState(62);
console.log(state());

//Overriding generic inferred types
const [state2, setState2] = simpleState<string | null>(null);
console.log(state2());
setState2("Hehe! Just overrid the initial null");
console.log(state2());

/* When simpleState(10) is called, TypeScript infers that T is number.
When simpleState<string | null>(null) is called, we explicitly set T to be string | null. */

// Interface to represent a ranked item
interface Rank<RankItem> {
    item: RankItem;  // The actual item being ranked
    rank: number;    // The rank associated with the item
  }
  
  // Generic ranking function
  function ranker<RankItem>(
    items: RankItem[],        // Array of items to be ranked
    rank: (v: RankItem) => number // Function that takes an item and returns its rank
  ): RankItem[] {
    // Map the items to an array of Rank objects
    const ranks: Rank<RankItem>[] = items.map((item) => ({
      item,                // The original item
      rank: rank(item),    // The rank of the item as determined by the rank function
    }));
  
    // Sort the array of Rank objects by the rank property in ascending order
    ranks.sort((a, b) => a.rank - b.rank);
  
    // Extract and return the sorted items from the sorted Rank objects
    return ranks.map((rank) => rank.item);
  }
  
  // Define an interface for Pokemon
  interface Pokemon {
    name: string;
    hp: number;
  }
  
  // Create an array of Pokemon objects
  const pokemon: Pokemon[] = [
    {
      name: "Bulbasaur",
      hp: 20,
    },
    {
      name: "Megaasaur",
      hp: 5,
    },
  ];
  
  // Use the ranker function to rank the Pokemon by their hp
  // The destructuring here extracts the 'hp' property directly
  const sortedPokemon = ranker(pokemon, ({ hp }) => hp);
  
  // Log the result to the console
  console.log(sortedPokemon); // Output: [{ name: "Megaasaur", hp: 5 }, { name: "Bulbasaur", hp: 20 }]
 /*  When you use object destructuring in function parameters, JavaScript automatically extracts the specified properties from the objects passed as arguments */