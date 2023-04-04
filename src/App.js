import './App.css';
import Card from './components/Card.jsx';
import Cards from './components/Cards.jsx';
//import SearchBar from './components/SearchBar.jsx';
// import characters, { Rick } from './data.js';
import Nav from './components/Nav'
import { useState } from 'react';

function App() {
   function onSearch(character) {
      const example = {
         id: 1,
         name: 'Rick Sanchez',
         status: 'Alive',
         species: 'Human',
         gender: 'Male',
         origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
         },
         image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      };
   }


   const [characters, setCharacters] = useState([])
   
   return (
      <div className='App' style={{padding:"25px"}}>
         {/* <SearchBar onSearch={(characterID) => window.alert(characterID)} /> */}
         <Nav />
         <Cards characters={characters} />
         <Card
            // id={Rick.id}
            // name={Rick.name}
            // status={Rick.status}
            // species={Rick.species}
            // gender={Rick.gender}
            // origin={Rick.origin.name}
            // image={Rick.image}
            // onClose={() => window.alert('Emulamos que se cierra la card')}
         />
      </div>
   );
}

export default App;
