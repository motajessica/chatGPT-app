import { useEffect, useState, useRef } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MemoryGame from "./components/MemoryGame";
import { CHARACTERS } from "./utils/constants";
import GeneratedText from "./components/GeneratedText";

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showMemoryGame, setShowMemoryGame] = useState(false);

  const handleCharacterButton = (character) => {
    setSelectedCharacter(selectedCharacter === character ? null : character);
  };

  const handlePlayMemoryGame = () => {
    setShowMemoryGame(true);
  };

  const handleBackToHome = () => {
    console.log("handleBackToHome triggered");
    setShowMemoryGame(false);
    setSelectedCharacter(null);
  };

  if (showMemoryGame) {
    return <MemoryGame onBack={handleBackToHome} />;
  }

  return (
    <div className="app">
      <Header />

      <main className="main">
        {showMemoryGame ? (
          <MemoryGame onBack={handleBackToHome} />
        ) : (
          <>
            <div className="button-container">
              {selectedCharacter === null ? (
                CHARACTERS.map((character) => (
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
                ))
              ) : (
                <div
                  className="character-card character-card-selected"
                  key={selectedCharacter.name}
                >
                  <img
                    src={selectedCharacter.image}
                    alt={selectedCharacter.name}
                    className="character-image"
                  />
                  <div>{selectedCharacter.name}</div>
                  <button
                    className="character-button"
                    onClick={() => setSelectedCharacter(null)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {selectedCharacter && (
              <GeneratedText character={selectedCharacter} />
            )}

            {!selectedCharacter && (
              <button className="play-button" onClick={handlePlayMemoryGame}>
                Play memory card
              </button>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
