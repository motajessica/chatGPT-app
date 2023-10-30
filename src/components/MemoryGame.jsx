import React, { useState } from "react";
import Card from "./Card";
import { CHARACTERS } from "../utils/constants";

export default function MemoryGame({ onBack }) {
  const [flippedIndices, setFlippedIndices] = useState([]);

  const handleBackButtonClick = () => {
    console.log("Back button clicked in MemoryGame");
    onBack();
};

  const handleCardClick = (index) => {
    setFlippedIndices((prevState) => [...prevState, index]);

    if (flippedIndices.length === 1) {
      const [firstIndex] = flippedIndices;

      if (shuffledAnimals[firstIndex].name !== shuffledAnimals[index].name) {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      } else {
        setFlippedIndices([]);
      }
    }
  };

  const oceanAnimalsDouble = [...CHARACTERS, ...CHARACTERS];
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const shuffledAnimals = shuffleArray(oceanAnimalsDouble);

  return (
    <>
    <div className="back-button">
        <button onClick={handleBackButtonClick}>&larr; back</button>
    </div>
    <div className="display-cards">
    
      {shuffledAnimals.map((animal, index) => (
        <Card
          key={index}
          isFlipped={flippedIndices.includes(index)}
          image={animal.image}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
    </>
  );
}
