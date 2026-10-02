// PRIMERA PARTE 

async function explorarPokemon() {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

  console.log(respuesta.status);
  console.log(respuesta.ok);

}