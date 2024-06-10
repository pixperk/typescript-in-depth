import fetch from "node-fetch";

interface PokemonResults {
  count?: number;
  next?: string;
  previous?: string;
  results?: {
    name: string;
    url: string;
  }[];
}



function fetchPokemon(
  url: string,
  cb: (data:PokemonResults)=>void
):void

function fetchPokemon(
  url: string 
):Promise<PokemonResults>

function fetchPokemon(
    url: string,
    cb?: (data:PokemonResults)=>void
  ):unknown
  {
 if(cb){
  import('node-fetch')
  .then(({ default: fetch }) => fetch(url))
  .then(res => res.json())
  .then(data => cb(data as PokemonResults));
    return undefined
 } else{
    return fetch(url).then(res=>res.json())
 }
}

fetchPokemon('https://pokeapi.co/api/v2/pokemon?offset=10&limit=10',(data)=>{
    data.results?.forEach(pokemon => console.log(pokemon.name))
});

(async function(){
    const data = <PokemonResults>(await fetchPokemon('https://pokeapi.co/api/v2/pokemon?offset=10&limit=10') )
    data.results?.forEach((pokemon)=>console.log(pokemon.name))
})()