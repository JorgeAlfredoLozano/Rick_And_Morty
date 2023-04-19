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
const URL_BASE = 'https://be-a-rym.up.railway.app/api/character';
const API_KEY = 'c614b8c077ef.ab13506744964c5db1d0';

function App() {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const EMAIL = 'puntonetazul@gmail.com';
  const PASSWORD = 'abcdef1';
  const navigate = useNavigate(); // Asignamos useNavigate a la variable navigate
  const location = useLocation();

  const login = (userData) => {
    if (userData.email === EMAIL && userData.password === PASSWORD) {
      setAccess(true);
      navigate('/home');
    }
  };

  const logOut = () => {
    setAccess(false);
    setCharacters([]);
    navigate('/');
  };

  useEffect(() => {
    !access && navigate('/');
  }, [access, navigate]);

  const onSearch = (id) => {
    // axios(`${URL_BASE}/${id}?key=${API_KEY}`)
    axios(`http://localhost:3001/rickandmorty/character/${id}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.id) {
          // Verificar si el personaje ya está en el estado
          if (characters.some((character) => character.id === data.id)) {
            alert('¡Este personaje ya ha sido agregado!');
          } else {
            setCharacters((oldChars) => [...oldChars, data]);
          }
        } else {
          alert('¡No hay personajes con este ID!');
        }
      });
  };

  const onClose = (id) => {
    const charactersfiltered = characters.filter((character) => character.id !== id);
    setCharacters(charactersfiltered);
  };

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

