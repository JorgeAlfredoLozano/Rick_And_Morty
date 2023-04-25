import { Link, useLocation } from "react-router-dom";
import './Card.css';
import { addFav, removeFav } from '../../redux/actions'
import { useState, useEffect } from "react";
import { connect } from "react-redux";

const Card = ({id, name, status, species, gender, origin, image, onClose, myFavorites, addFav, removeFav }) => {
  const [isFav, setIsFav] = useState(false);
  const location = useLocation();
   const handleAddToFavorites = () => {
      addFav({ id, name, status, species, gender, origin, image });
      setIsFav(true);
    };
  
    const handleRemoveFromFavorites = () => {
      removeFav(id);
      setIsFav(false);
     
    };
    
    useEffect(() => {
      setIsFav(myFavorites.some((character) => character.id === +id));
    }, [myFavorites, id]);
    
    const isFavoritesRoute = location.pathname === "/favorites";
    
    return (
    <div className="card-container">
      {
        isFav ? (
            <button onClick={handleRemoveFromFavorites}>❤️</button>
        ) : (
            <button onClick={handleAddToFavorites}>🤍</button>
        )
      }
      {
        !isFavoritesRoute && <button className="close-button" onClick={() => onClose(id)}>X</button>
      }
      
      <Link to={`/detail/${id}`} style={{ display: "flex" }}>
        <img className="card-imagen" src={image} alt={name} />
      </Link>
      <h2 className="card-heading">{name}</h2>
      <h2 className="card-heading">{status}</h2>
      <h2 className="card-heading">{species}</h2>
      <h2 className="card-heading">{gender}</h2>
      <h2 className="card-heading">{origin}</h2>
      <h1 className="card-id">{id}</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
   return {
      myFavorites: state.myFavorites,
   }
 };
 
 const mapDispatchToProps = (dispatch) => {
   return {
     addFav: (character) => {dispatch(addFav(character))},
     removeFav: (id) => {dispatch(removeFav(id))}
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);

