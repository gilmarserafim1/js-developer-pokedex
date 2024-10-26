import axios from 'axios';
import './styles.css'
import { Pokemon } from '../../models/pokemon';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';

const Home = () => {

    const maxRecords = 151;
    let limit = 10;

    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    
    useEffect(() => {

        const loadPokemons = async (offset, limit) => {            

            const nextOffset = offset + limit;
            let correctLimit = 0;
            if(nextOffset >= maxRecords){
                correctLimit = maxRecords - offset;
                setIsVisible(false);
            } else {
                correctLimit = limit;
            }

            const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${correctLimit}`
    
            try {
                const response = await axios.get(url);
                const pokemonsUrl = response.data.results;
                console.log(pokemonsUrl)
                const pokemonsData = await Promise.all(pokemonsUrl.map(async (pokemon) => {
                    const pokemonData = await axios.get(pokemon.url)
                    return pokemonData.data;
                }));
               
                const pokemonList = pokemonsData.map(createPokemon);
            
                setPokemons((prev) => [...prev, ...pokemonList]);
        
            } catch(error) {
                alert(error);
                return " ";
            }   
        }
        loadPokemons(offset, limit);

    },[offset, limit]);
    
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
    

    return (
        <>
            <Header />
            <section id="section">

                {pokemons.map(pokemon => <Card key={pokemon.number} pokemon={pokemon} />)}

            </section>
            <Footer isVisible={isVisible} onClick={() => setOffset(prev => prev + limit)} />
    
        </>
    );
}

export default Home;