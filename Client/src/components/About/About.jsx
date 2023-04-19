import React from 'react';
import styles from '../About/About.css';
import imagen from '../../assets/foto.png';

const About = () => {
    return(
        <div className="about-container">
            <h2>Acerca del proyecto Rick and Morty</h2>
            <div className="image-container">
                <img src={imagen} alt="Imagen del proyecto Rick and Morty" />
            </div>
            <p>
                El proyecto Rick and Morty me presentó un gran desafío para aplicar las habilidades y conocimientos adquiridos a lo largo del bootcamp de Soy Henry. Me permitió profundizar en React y otras tecnologías frontend, así como practicar el trabajo con APIs, el manejo de datos y la construcción de una aplicación web completa desde cero.
            </p>
            <p style={{ clear: 'both' }}>
                A lo largo del proyecto, incorporé diversas herramientas y técnicas, como React hooks, Redux, styled components y más. Aprendí mucho sobre las mejores prácticas y enfoques para construir código escalable y mantenible, así como sobre cómo colaborar efectivamente con otros desarrolladores y partes interesadas.
            </p>
            <p>
                En general, el proyecto Rick and Morty fue una experiencia valiosa que no solo me ayudó a crecer como desarrollador, sino que también me dio la oportunidad de mostrar mis habilidades y creatividad de una manera divertida y atractiva.
            </p>
        </div>
    

    )
}

export default About