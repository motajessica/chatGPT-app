import React, { useState, useEffect } from "react";
import Card from "./Card";
import { CHARACTERS } from "../utils/constants";

export default function MemoryGame({ onBack }) {
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [shuffledAnimals, setShuffledAnimals] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  const [hasWon, setHasWon] = useState(false);

  // useEffect(() => {
  //   const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  //   const oceanAnimalsDouble = [...CHARACTERS, ...CHARACTERS];
  //   setShuffledAnimals(shuffleArray(oceanAnimalsDouble));
  // }, []);

  useEffect(() => {
    const selectRandomCharacters = (array, num) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    };
  
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  
    const selectedCharacters = selectRandomCharacters(CHARACTERS, 4);
    const oceanAnimalsDouble = [...selectedCharacters, ...selectedCharacters];
  
    const shuffledPairs = shuffleArray(oceanAnimalsDouble);
  
    setShuffledAnimals(shuffledPairs);
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
      <h2 className="">Sea Creatures Memory Card Game</h2>
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
