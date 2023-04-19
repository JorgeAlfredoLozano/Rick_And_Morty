import React from "react";
import { connect, useDispatch } from "react-redux";
import Card from '../Card/Card'
import { filterCards, orderCards } from "../../redux/actions";
import { useState } from "react";

function Favorites(props) {
  const { myFavorites } = props;
  const dispatch = useDispatch();
  const [aux,setAux] = useState(false);

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value)); //el valor del option "A" o "D"
    setAux(true);
  }

  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value)); //es del select "Male", "Female"...
  }

  return (
    <div>
      <select onChange={handleOrder}>
        <option value="A" >Ascendente</option>
        <option value="D" >Descendente</option>
      </select>
      
      <select onChange={handleFilter}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">unknown</option>
        <option value="allCharacters">All Characters</option>
      </select>

      {myFavorites.map((character) => (
        <Card key={character.id} 
              id={character.id} 
              name={character.name}
              species={character.species}
              gender={character.gender}
              image={character.image}
              onClose={character.onClose}
        />
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    myFavorites: state.myFavorites,
  };
}

export default connect(mapStateToProps)(Favorites);

