const createPokemon = (pokemonDetail) => {

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    return new Pokemon(
        pokemonDetail.id,
        pokemonDetail.name,
        type,
        types,
        pokemonDetail.sprites.other.dream_world.front_default
    );
}

const loadPokemons = async (offset, limit) => {
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    try {
        const response = await axios.get(url);
        const pokemonsUrl = response.data.results;
        const pokemonsData = await Promise.all(pokemonsUrl.map(async (pokemon) => {
            const pokemonData = await axios.get(pokemon.url)
            return pokemonData.data;
        }));
        const pokemonData = pokemonsData.map(createPokemon);
    
        return pokemonData.map(convertPokemonToLi).join("")

    } catch(error) {
        alert(error);
        return " ";
    }
    
}

const convertPokemonToLi = (pokemon) => {

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

const handleCardClick = async (id) => {
    try {
        // Primeira requisição para obter height, weight, abilities, e stats
        const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const responsePokemon = await axios.get(urlPokemon);
        const dataPokemon = responsePokemon.data;

        const height = dataPokemon.height; // Altura em decímetros
        const weight = dataPokemon.weight; // Peso em hectogramas
        const abilities = dataPokemon.abilities.map((ability) => ability.ability.name); // Habilidades

        // Obter stats do Pokémon
        const stats = dataPokemon.stats.reduce((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat; // Extrair as estatísticas
            return acc;
        }, {});

        const specialAttack = stats['special-attack']; // Access using the API key
        const specialDefense = stats['special-defense']; // Same for special-defense

        // Segunda requisição para obter category, gender, egg groups e egg cycles
        const urlSpecies = dataPokemon.species.url;
        const responseSpecies = await axios.get(urlSpecies);
        const dataSpecies = responseSpecies.data;

        // Extrair category
        const category = dataSpecies.genera.find(genus => genus.language.name === "en").genus;

        // Extrair gender rate e calcular os gêneros
        const genderRate = dataSpecies.gender_rate;
        let gender;
        if (genderRate === -1) {
            gender = "Genderless";
        } else {
            const femalePercentage = (genderRate / 8) * 100;
            const malePercentage = 100 - femalePercentage;
            gender = `Male: ${malePercentage}%, Female: ${femalePercentage}%`;
        }

        // Extrair egg groups e egg cycles
        const eggGroups = dataSpecies.egg_groups.map(group => group.name);
        const eggCycles = dataSpecies.hatch_counter; // Número de ciclos para chocar o ovo

        // Cálculo do total de stats
        const totalStats = Object.values(stats).reduce((sum, value) => sum + value, 0);

        // Exibir os dados
        console.log({
            category,
            height,
            weight,
            abilities,
            gender,
            eggGroups,
            eggCycles,
            hp: stats.hp,
            attack: stats.attack,
            defense: stats.defense,
            specialAttack,
            specialDefense,
            speed: stats.speed,
            total: totalStats,
        });


    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
};

