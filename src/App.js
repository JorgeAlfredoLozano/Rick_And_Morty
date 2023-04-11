import './App.css';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import Detail from './components/Detail/Detail';
import About from "./components/About/About"
import Error from './components/Error/Error';
import Form from './components/Form/Form';
import { useState, useEffect } from 'react';
import axios from 'axios'
import {useLocation,Routes,Route,useNavigate} from 'react-router-dom'

// conecto con la api de R&M de Henry
const URL_BASE = 'https://be-a-rym.up.railway.app/api/character'
const API_KEY ='c614b8c077ef.ab13506744964c5db1d0'

function App() {
   const [characters, setCharacters] = useState([]); //destructurin con array porque el useState devuelve un array
   const [access,setAccess] = useState(false)
   const EMAIL = "puntonetazul@gmail.com"
   const PASSWORD = "abcdef1"
   const navigate = useNavigate(); //lo utilizo para navegar entre las rutas
   const location = useLocation(); //lo utilizo para saber si estoy sobre el login para no mostrar la NAV

   const login = (userData) => {
      if (userData.email === EMAIL && userData.password === PASSWORD) { //controlo email y password
         setAccess(true) //seteo el acceso si mail y contraseña son correctos
         navigate('/home') //navego hasta la home
      }
   }

   const logOut = () => {
      setAccess(false)
      navigate('/')
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access,navigate]);

   const onSearch =(id) => {
      //axios(`https://rickandmortyapi.com/api/character/${id}`) //
      axios(`${URL_BASE}/${id}?key=${API_KEY}`)
      .then(response => response.data)
      .then((data) => {
         if (data.id) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose =(id) => {
      const charactersfiltered = characters.filter(character => character.id !== id)
      setCharacters(charactersfiltered)
   }
   
   
   
   return (
      <div className='App'>
         {location.pathname !== "/" && ( //si no estoy en el path "/" muestro la NAV bar, para que no salga el login. Utilizo el pathname de use Location
            <Nav onSearch={onSearch} logOut={logOut} />
         )}
         {/* renderizamos las rutas de nuesta app */}
         <Routes>
               <Route path='/' element={<Form login={login}/>} />
               <Route path='/Home' element={<Cards characters={characters} onClose={onClose}/>} />
               <Route path='/About' element={<About/>} />
               <Route path='/Detail/:id' element={<Detail/>} />
               <Route path="*" element={<Error />} />
         </Routes>   
      </div>
   );
}

export default App;
