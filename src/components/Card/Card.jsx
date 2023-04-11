import { Link } from "react-router-dom";
import './Card.css';


const Card = ({id,name,status,species,gender,origin,image,onClose}) => {
   return (
  
<div className="card-container">
         
            <button className="close-button" onClick={() => onClose(id)}>X</button>
            {/* <div style={{ position: "flex" }}> */}
               {/* <h3 className="card-name" style={{ marginBottom: "5px" }}>{name}</h3> */}
               <Link to={`/detail/${id}`} style={{ display: "flex" }}>
                  <img className="card-imagen" src={image} alt={name} />
               </Link>
            {/* </div> */}
         
         
            <h2 className="card-heading">{name}</h2>
            <h2 className="card-heading">{status}</h2>
            <h2 className="card-heading">{species}</h2>
            <h2 className="card-heading">{gender}</h2>
            <h2 className="card-heading">{origin}</h2>
            <h1 className="card-id">{id}</h1>
      </div>
   );
}

export default Card;

