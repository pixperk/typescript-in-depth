interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

type FetchPokemonResult<T> = T extends undefined ? Promise<PokemonResults> : void;

function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
  url: string,
  cb?: T
): FetchPokemonResult<T> {
  // Mocking the fetching behavior
  const mockFetch = async (url: string) => {
    const mockData: PokemonResults = {
      count: 1118,
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        // Add more mock data as needed
      ]
    };
    return mockData;
  };

  if (cb) {
    // Simulating asynchronous behavior
    setTimeout(async () => {
      const data = await mockFetch(url);
      cb(data);
    }, 1000);
    return undefined as FetchPokemonResult<T>;
  } else {
    return mockFetch(url) as FetchPokemonResult<T>;
  }
}

// Using the fetchPokemon function with callback
fetchPokemon("https://pokeapi.co/api/v2/pokemon?offset=10&limit=10", data => {
  data.results.forEach(pokemon => console.log(pokemon.name));
});

// Using the fetchPokemon function with async/await
(async function () {
  const data = <PokemonResults>(
    await fetchPokemon("https://pokeapi.co/api/v2/pokemon?offset=10&limit=10")
  );
  data.results.forEach(pokemon => console.log(pokemon.name));
})();
