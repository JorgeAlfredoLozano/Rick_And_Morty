import { useState, useEffect } from "react";
import { validate } from '../validation';
import "./Form.css"
import fondoForm from '../../assets/login-form.png'
import intro from '../../assets/RickAndMorty.mp3'

const Form = (props) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.4);

    const handleOnChange = (event) => {//controlo para que el input sea siempre igual al valor del estado, en el input coloco el onChange
      const { name, value } = event.target; //aplico destructuring
      // Usar una función para actualizar el estado con el estado anterior
      setUserData(prevUserData => ({// hago una copia del estado para no pisarlo y igualo a la propiedad name con value del target
          ...prevUserData,
          [name]: value
      }));
  
      // Invocar la función de validación
      const errors = validate({ ...userData, [name]: value });
      setErrors(errors);
    }

    useEffect(() => {
        const audio = document.getElementById("myAudio");
        audio.volume = volume;
        audio.play();
    }, [volume]);

    const handleSubmit = (event) => {
        event.preventDefault()
        props.login(userData)
    }

    const handleMute = () => {
        setIsMuted(!isMuted);
        const audio = document.getElementById("myAudio");
        audio.muted = !audio.muted;
    };

    const handleVolumeUp = () => {
        if (volume < 0.8) {
            setVolume(volume + 0.1);
        }
    };
    
    const handleVolumeDown = () => {
        if (volume > 0.1) {
            setVolume(volume - 0.1);
        }
    };
    
    
    return(
        <form onSubmit={handleSubmit} className="form-container">  
            <div>
                <img className="title" src={fondoForm} alt="Login" />
                <label htmlFor="email" className="title-middle-email">email</label> 
                    <input className="title-input-email" name="email" type="email" placeholder="Ingrese su email" value={userData.email} onChange={handleOnChange} />
                <span> </span>
                <label htmlFor="password" className="title-middle-password">contraseña</label>
                    <input className="title-input-password" name="password" type="password" placeholder="Ingrese su contraseña" value={userData.password} onChange={handleOnChange} />
            </div>
            <div>
                <button className="btn" disabled={!userData.email || !userData.password || errors.email || errors.password}>Enviar</button>
            </div>

            <div>
                {errors.email && <span className="alert-error-message-mail">{errors.email}</span>}
                {errors.password && <span className="alert-error-message-pass">{errors.password}</span>}
                {userData.email && userData.password && !errors.email && !errors.password && (
                    <>
                        <div className="alert-success">Sus datos son correctos Rick!</div>
                        <div className="alert-successB">Presiona enviar y Bienvenido!</div>
                    </>
                    )}
            </div>   
            <div className="audio">
                <label htmlFor="muteCheckbox">Mute</label>
                <input
                    id="muteCheckbox"
                    type="checkbox"
                    checked={isMuted}
                    onChange={handleMute}
                />
                  <button onClick={handleVolumeUp}>+</button>
                  <button onClick={handleVolumeDown}>-</button>
            </div>
            <audio id="myAudio" loop={!isMuted}>
                <source src={intro} type="audio/mpeg" />
            </audio>
        </form>
    )
}

export default Form;





















// import { useState } from "react";

// const Form = () => {
//     const [userData, setUserData] = useState({
//         email: '',
//         password: ''
//     })

//     const [errors, setErrors] = useState({
//         email: '',
//         password: ''
//     })

//     const handleOnChange = (event) => {
//         console.log(event.target.name);
//         setUserData({
//             ...userData,
//             [event.target.name]: event.target.value
//         })
//         validate()
//     }

//     const validate = () => {
//         if (!/\S+@\S+\.\S+/.test(userData.email)) {
//           setErrors((prevState) => ({
//             ...prevState,
//             email: 'por favor, revisa tu email, rey/reina'
//           }));
//         } else {
//           setErrors((prevState) => ({
//             ...prevState,
//             email: ''
//           }));
//         }
    
//         if (userData.password.length < 6) {
//           setErrors((prevState) => ({
//             ...prevState,
//             password: 'tiene que tener un mínimo de 6 caracteres'
//           }));
//         } else {
//           setErrors((prevState) => ({
//             ...prevState,
//             password: ''
//           }));
//         }
//     };
    
    

//     const handleOnSubmit = (event) => {
//         event.preventDefault()
//     }

//     return(
//         <form onSubmit={handleOnSubmit}>
//             <h1>Holi, soy el Form</h1>

//             <label htmlFor="email">Email: </label>
//             <input name="email" type="email" placeholder="ingrese su mail" value={userData.email} onChange={handleOnChange} />
//             {errors.email && <p>{errors.email}</p>}
//             <hr />
//             <label htmlFor="password">Password: </label>
//             <input name="password" type="text" placeholder="ingrese una password" value={userData.password} onChange={handleOnChange}  />
//             {errors.password && <p>{errors.password}</p>}
//             <hr />
//             <button disabled={!userData.email || !userData.password || errors.email || errors.password} >Enviar</button>
//         </form>
//     )
// }

// export default Form;