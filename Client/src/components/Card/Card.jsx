import { Link } from "react-router-dom";
import './Card.css';
import { addFav, removeFav } from '../../redux/actions'
import { useState } from "react";
import { connect } from "react-redux";

const Card = ({id, name, status, species, gender, origin, image, onClose, addFav, removeFav}) => {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    setIsFav(!isFav);
    if (isFav) {
      removeFav(id);
    } else {
      addFav({ id, name, image });
    }
  }

  return (
    <div className="card-container">
      {
   isFav ? (
      <button onClick={handleFavorite}>❤️</button>
   ) : (
      <button onClick={handleFavorite}>🤍</button>
   )
}
      <button className="close-button" onClick={() => onClose(id)}>X</button>
      {/* <button onClick={handleFavorite}>{isFav ? 'Eliminar de favoritos' : 'Añadir a favoritos'}</button> */}
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

const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (fav) => { dispatch(addFav(fav)) },
    removeFav: (id) => { dispatch(removeFav(id)) }
  }
}

export default connect(null, mapDispatchToProps)(Card);

