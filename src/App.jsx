import { useEffect, useState, useRef } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MemoryGame from "./components/MemoryGame";
import { CHARACTERS } from "./utils/constants";
import GeneratedText from "./components/GeneratedText";



const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Note the addition of setSelectedCharacter
  const [showMemoryGame, setShowMemoryGame] = useState(false);

  const handleCharacterButton = (character) => {
    setSelectedCharacter(character);
  };

  const handlePlayMemoryGame = () => {
    setShowMemoryGame(true);
  };

  const handleBackToHome = () => {
    console.log("handleBackToHome triggered");
    setShowMemoryGame(false);
  };


  if (showMemoryGame) {
    return <MemoryGame onBack={handleBackToHome} />;
  }

  return (
    <div className="app">
      <Header/>
      
       {showMemoryGame ? (
      <MemoryGame onBack={handleBackToHome} />
    ) : (

      <main className="main">
        <div className="button-container">
          {CHARACTERS.map((character) => (
            <div className="character-card" key={character.name}>
              <img
                src={character.image}
                alt={character.name}
                className="character-image"
              />
              <button
                className="character-button"
                onClick={() => handleCharacterButton(character)}
              >
                {character.name}
              </button>
            </div>
          ))}
        </div>

        <GeneratedText character={selectedCharacter} />

        <button className="play-button" onClick={handlePlayMemoryGame}>
          Play memory card
        </button>
      </main>

    )}
      
      
      <Footer />
    </div>
  );
};

export default App;

