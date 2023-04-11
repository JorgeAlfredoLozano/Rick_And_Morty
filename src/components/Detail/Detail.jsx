import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import "./Detail.css" // Agregue su archivo CSS aquí

const Detail = () => {
    const {id} = useParams();
    const [character, setCharacter] = useState({});
    const [error, setError] = useState(false);
    
    useEffect(() => {
        axios(`https://rickandmortyapi.com/api/character/${id}`)
        .then(({ data }) => {
            if (Object.keys(data).length === 0 && data.constructor === Object) {
                setError(true);
            } else {
                setCharacter(data);
            }
        })
        .catch(() => {
            setError(true);
        });
    }, [id]);

    if (error) {
        return <p>No hay personajes con ese ID</p>
    }

    return (
        <div className="detail-container">
            <div className="character-info">
                <p><span className="bold-text">Name:</span> <span className="comic-text">{character.name}</span></p>
                <p><span className="bold-text">Status:</span> <span className="comic-text">{character.status}</span></p>
                <p><span className="bold-text">Species:</span> <span className="comic-text">{character.species}</span></p>
                <p><span className="bold-text">Gender:</span> <span className="comic-text">{character.gender}</span></p>
                <p><span className="bold-text">Origin:</span> <span className="comic-text">{character.origin?.name}</span></p>
                {/* Utilice el operador de encadenamiento opcional (?.) para evitar errores en caso de que la propiedad no esté definida */}
            </div>
            <div className="character-image">
                {character.image ? <img src={character.image} alt={character.name} className="character-image" /> : null}

            </div>
        </div>
    )
    
}

export default Detail

