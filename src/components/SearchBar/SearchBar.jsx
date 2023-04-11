import { useState } from "react";

export default function SearchBar({ onSearch }) {
   const [id, setId] = useState('')
   
   //el event se dispara en el onChange del input en este caso
   const handleChange = (event) => {
      setId(event.target.value)
   }
   return (
      <div>
         {/* //se iguala el value con id para que siempre este actualizado el valor con el del estado, para que si el usuario cambia el valor se actualice */}
         <input type='search' onChange={handleChange} value={id} />
         {/* //para pasar argumentos a la funcion onSearch, tengo que hacer un CB para que no se ejecute, sino que cuando hagan click se ejecute la callback. */}
         {/* porque si lo pongo suelto al onSearch(id) se invoca cuando lea el codigo, en cambio lee la cb pero no la ejecuta hasta que se haga click */}
         <button onClick={() => onSearch(id)}>Agregar</button> 
      </div>
   );
}
