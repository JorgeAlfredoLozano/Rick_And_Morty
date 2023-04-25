import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom'; // Importamos useNavigate
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import Detail from './components/Detail/Detail';
import About from './components/About/About';
import Error from './components/Error/Error';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites'
// const URL_BASE = 'https://be-a-rym.up.railway.app/api/character';
// const API_KEY = 'c614b8c077ef.ab13506744964c5db1d0';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [showImage, setShowImage] = useState(true);
  const [access, setAccess] = useState(false);
  const URL = 'http://localhost:3001/rickandmorty/login/';

  const login = async (userData) => {
    try {
      const { email, password } = userData;
      const { data } = await axios(URL + `?email=${email}&password=${password}`)
      
      const { access } = data;
      
      setAccess(access);
      access && navigate('/home');
    } catch (error) {
        console.log(error.message)
    }
     
 }

  const logOut = () => {
    setAccess(false);
    setCharacters([]);
    navigate('/');
  };

  useEffect(() => {
    !access && navigate('/');
  }, [access, navigate]);

  const onSearch = async (id) => {
    try {
      const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
      if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
            
          } 
  } catch (error) {
      alert('¡No hay personajes con este ID!');
  }
  }
    


  const onClose = (id) => {
    const charactersFiltered = characters.filter(character => character.id !== (id)) 
    setCharacters(charactersFiltered)
    if (charactersFiltered.length === 0) {
       setShowImage(true);
    }
 }

  return (
    <div className='App'>
      {location.pathname !== '/' && <Nav onSearch={onSearch} logOut={logOut} />}
      <Routes>
        <Route path='/' element={<Form login={login} />} />
        <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
        <Route path='/about' element={<About />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

