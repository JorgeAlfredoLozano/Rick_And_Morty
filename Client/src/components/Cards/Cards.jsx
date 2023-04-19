import { useState, useEffect } from 'react';
import './Cards.css';
import Card from '../Card/Card';

const Cards = ({ characters, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 280; // Ancho de cada carta en píxeles
  const numVisibleCards = 5; // Número de cartas visibles en el carrousel
  const maxIndex = characters.length - numVisibleCards;
  const nextDisabled = currentIndex >= maxIndex;
  const prevDisabled = currentIndex === 0;
  const totalCards = characters.length;
  const [translateX, setTranslateX] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    setMarginLeft(translateX);
  }, [translateX]);

  const handleNextClick = () => {
    if (nextDisabled) {
      return;
    }

    const newTranslateX = translateX - cardWidth;
    setTranslateX(newTranslateX);
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevClick = () => {
    if (prevDisabled) {
      return;
    }

    const newTranslateX = translateX + cardWidth;
    setTranslateX(newTranslateX);
    setCurrentIndex(currentIndex - 1);
  };

  const handleCardClick = (index) => {
    setCurrentIndex(index);
    setTranslateX(-index * cardWidth);
  };

  return (
    <section className="cards-container">
      <div className="carousel-controls">
        <button className="carousel-control" onClick={handlePrevClick} disabled={prevDisabled}>
          Prev
        </button>
        <button className="carousel-control" onClick={handleNextClick} disabled={nextDisabled}>
          Next
        </button>
      </div>
      <div className="cards-wrapper" style={{ transform: `translateX(${translateX}px)`, marginLeft: `${marginLeft}px` }}>
        {characters.map((character, index) => (
          <Card
            key={character.id || index}
            id={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            gender={character.gender}
            origin={character.origin?.name}
            image={character.image}
            onClose={onClose}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Cards;



