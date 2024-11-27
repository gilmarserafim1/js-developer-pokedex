const loadPokemons = async (offset, limit) => {
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    try {
        // primeira requisição para obter as URL de cada Pokémon
        const pokemonUrlList = await fetch(url)
            .then(response => response.json())
            .then(jsonBody => jsonBody.results);
    
        // faz uma requisição da URL para obter os dados de cada Pokémon do array
        const pokemonsData = await Promise.all(pokemonUrlList.map(
            async pokemon => {
                return await fetch(pokemon.url)
                    .then(response => response.json());
            }
        ));
    
        return pokemonsData;
    
    } catch (error) {
        alert(error);
    }
    
}



const createNewPokemon = (pokemon) => {

    const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    return new Pokemon(
        pokemon.id,
        pokemon.name,
        type,
        types,
        pokemon.sprites.other.dream_world.front_default
    );
}



const createCard = (pokemon) => {

    return `
        <span onclick="handleCardClick(${pokemon.number})" class="card ${pokemon.mainType}">

            <div class="circle">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>            

            <span class="idName">${pokemon.number}. ${pokemon.name}</span>

            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
                
        </span>
   `;

}