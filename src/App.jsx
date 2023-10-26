import { useEffect, useState, useRef } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import MemoryGame from "./components/MemoryGame";
import Footer from "./components/Footer";

export const CHARACTERS = [
  {
    name: "yellow-eyed penguin",
    image:
      "https://images.theconversation.com/files/405667/original/file-20210610-19-19zcvem.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C4437%2C2955&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
  },
  {
    name: "Hector Dolphin",
    image:
      "https://missionblue.org/wp-content/uploads/2016/05/face-on-jump-4.jpg",
  },
  {
    name: "Fur Seal",
    image:
      "https://www.doc.govt.nz/globalassets/images/nature/native-animals/marine-mammals/seals/nz-fur-seal/furseal-kclements-1200-12.jpg",
  },
  {
    name: "Blue Penguin",
    image:
      "https://nzbirdsonline.org.nz/sites/all/files/1200121BluePenguin1.jpg",
  },
];

const App = () => {
  const [selectedCharacter] = useState(null);
  const [story, setStory] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);

  const buttonRef = useRef(null);

  const handleCharacterSelection = async (character) => {
    const role = "system";
    const content = `Create a kids story for a 3 years old kid about the ${character.name} sea animal. Say some real fact about this new zealand sea animal, and keep it at maximum 30 words`;

    const message = { role, content };

    try {
      setIsLoading(true);
      const response = await sendMessageToChatGPT(message);

      if (
        response &&
        Array.isArray(response.choices) &&
        response.choices.length > 0
      ) {
        const generatedStory = response.choices[0].message.content;
        setStory(generatedStory);
        setError(null);
      } else {
        setError("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching story:", error);
      setError("Error fetching story");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessageToChatGPT = async (message) => {
    try {
      const response = await fetch("/api/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      throw new Error("Error");
    }
  };

  const handlePlayMemoryGame = () => {
    setShowMemoryGame(true);
  };

  if (showMemoryGame) {
    return <MemoryGame />;
  }

  useEffect(() => {}, [selectedCharacter]);

  return (
    <div className="app">
      <header className="header">
        <h2>New Zealand Ocean Creatures</h2>
        <h4>Meet Our Marine Mates and Their Watery Worlds</h4>
      </header>
      <main className="main">
        <div></div>

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
                ref={buttonRef}
                onClick={() => handleCharacterSelection(character)}
              >
                {character.name}
              </button>
            </div>
          ))}
        </div>

        {isLoading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {story && <div className="story">{story}</div>}
        <button className="play-button" onClick={handlePlayMemoryGame}>
          Play memory card
        </button>
      </main>
      {/* <MemoryGame /> */}
      <Footer />
    </div>
  );
};

export default App;
