import React, { useState, useEffect } from "react";
import Card from "./Card";
import { CHARACTERS } from "../utils/constants";

export default function MemoryGame({ onBack }) {
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [shuffledAnimals, setShuffledAnimals] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    const oceanAnimalsDouble = [...CHARACTERS, ...CHARACTERS];
    setShuffledAnimals(shuffleArray(oceanAnimalsDouble));
  }, []);

  const handleBackButtonClick = () => {
    console.log("Back button clicked in MemoryGame");
    onBack();
  };

  const handleCardClick = (index) => {
    if (flippedIndices.includes(index)) return;

    setFlippedIndices((prevState) => [...prevState, index]);

    if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const secondIndex = index;

      if (
        shuffledAnimals[firstIndex].name === shuffledAnimals[secondIndex].name
      ) {
        setTimeout(() => {
          setFoundPairs((prev) => {
            const newPairs = [...prev, shuffledAnimals[firstIndex].name];

            if (newPairs.length === CHARACTERS.length) {
              setHasWon(true);
            }
            return newPairs;
          });
          setFlippedIndices([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <>
      <div className="back-button">
        <button onClick={handleBackButtonClick}>&larr; back</button>
      </div>
      {hasWon ? (
        <div>You Win!</div>
        
      ) : (
        <div className="display-cards">
          {shuffledAnimals.map((animal, index) => (
            <Card
              key={index}
              isFlipped={
                flippedIndices.includes(index) ||
                foundPairs.includes(animal.name)
              }
              image={animal.image}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      )}
    </>
  );
}
