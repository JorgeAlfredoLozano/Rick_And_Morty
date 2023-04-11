import { useState } from "react";
import { validate } from '../validation';
import "./Form.css"

const Form = (props) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

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

    const handleSubmit = (event) => {
        event.preventDefault()
        props.login(userData)
    }

    return(
        <form onSubmit={handleSubmit} className="form-container">  
            <div>
                <div><h1 className="title">Login</h1></div>
                {/* //htmlFor se referencia con name del input (asocian) */}
                <label htmlFor="email" className="title-middle">Email:</label> 
                    <input name="email" type="email" placeholder="Ingrese su email" value={userData.email} onChange={handleOnChange} />
                <span> </span>
                <label htmlFor="password" className="title-middle">Contraseña:</label>
                    <input name="password" type="password" placeholder="Ingrese su contraseña" value={userData.password} onChange={handleOnChange} />
                <button disabled={!userData.email || !userData.password || errors.email || errors.password} >Enviar</button>
            </div>

            <div>
                {errors.email && <span className="alert-error-message-mail">{errors.email}</span>}
                {errors.password && <span className="alert-error-message-pass">{errors.password}</span>}
                {userData.email && userData.password && !errors.email && !errors.password && <div className="alert alert-success">Sus datos han sido enviados correctamente!</div>}
            </div>     
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