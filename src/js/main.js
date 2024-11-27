const maxRecords = 151;
let limit = 10;
let offset = 0;



const createCards = async () => {
    
    const pokemonList = await loadPokemons(offset, limit);

    const pokemonObjectArray = pokemonList.map(createNewPokemon);

    const cards = pokemonObjectArray.map(createCard);

    document.getElementById("section").innerHTML += cards;
    offset += limit;
}

    
document.getElementById("loadMore").addEventListener("click", () => {
    const nextRecords = offset + limit;
    if(nextRecords >= maxRecords){
        limit = maxRecords - offset;
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    createCards();
});

createCards();




