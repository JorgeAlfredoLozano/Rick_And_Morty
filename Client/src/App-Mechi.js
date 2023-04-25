import './App.css';
import Cards from './components/Cards/Cards.jsx';
// import Title from "./components/Title/Title.jsx";
import Nav from "./components/SearchBar/Nav";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import About from './components/About/About';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form';
import video from './espacio-2381.mp4';
import Favorites from "./components/Favorites/Favorites"


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
         const { data } = await axios(URL + `?email=${email}&password=${password}`);
         
         const { access } = data;
         setAccess(access);
         access && navigate('/home');

      } catch (error) {
         alert('Ocurrió un error al intentar iniciar sesión.');
      }
   };
   
   useEffect(() => {
      !access && navigate('/')
   }, [access, navigate])
   
   const onSearch = async (id) => {
      try {
         const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
            
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
            setShowImage(false);
         } 

      } catch (error) {
         alert('¡No hay personajes con este ID!');
      }
   };

   const onClose = (id) => {
      const charactersFiltered = characters.filter(character => character.id !== (id)) 
      setCharacters(charactersFiltered)
      if (charactersFiltered.length === 0) {
         setShowImage(true);
      }
   }
   // const getRandomCharacter = () => {
   //    const randomId = Math.floor(Math.random() * 826) + 1; // Genera un número aleatorio entre 1 y 826
   //    axios(`https://rickandmortyapi.com/api/character/${randomId}`)
   //      .then(response => response.data)
   //      .then((data) => {
   //        if (data.name) {
   //          setCharacters((oldChars) => [...oldChars, data]);
   //          setShowImage(false);
   //        } else {
   //          alert('¡No hay personajes con este ID!');
   //        }
   //      });
   //  }
   
   return (
      <div className='App'>
      <video autoPlay loop muted>
        <source src={video} type='video/mp4' />
      </video>
{
         location.pathname === '/' ? <div className='title-image'>
         <img src='https://occ-0-5428-1740.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABWT5HIl9YXE1ZG5Khq2rGPAsxwcnKPhqJMO3E2WiZBVNemNHAlH148400SKvcFoxJFZsxLBpOCb31CliGnE3RYbxVAyHf10wyEfqZHliqF0z.png?r=a6e' alt='Login Rick'/>
         </div> : <Nav onSearch={onSearch} setAccess={setAccess}/>}
                 
         {location.pathname === '/' ? <Form login={login} /> : <Nav onSearch={onSearch} setAccess={setAccess} />}
                 
         <Routes>
            {/* <Route path="/" element={<Form/>} /> */}
            <Route path='/home' element={<Cards onClose={onClose} characters={characters} />} />
            <Route path='/about' element={<About/>} />
            <Route path='/detail/:id' element={<Detail/>} />
            <Route path='/favorites' element={<Favorites/>} />
           
         </Routes>
      
         
      </div>
   );
   }


export default App;