import './styles.css'

const Card = ({pokemon}) => {
    return (
        <>
            <div onClick={null} className={`card ${pokemon.mainType}`}>

                <div className="circle">
                    <img className="avatar" src={pokemon.photo} alt={pokemon.name} />
                </div>            

                <span className="idName">{pokemon.number}. {pokemon.name}</span>

                <ol className="types">
                    {pokemon.types.map((type) => <li key={type} className={`type ${type}`}>{type}</li>)}
                </ol>
                    
            </div>
        </>   
   );
}

export default Card;