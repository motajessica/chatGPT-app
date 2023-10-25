import { useEffect, useState, useRef } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";


const CHARACTERS = [
  {
    name: "yellow-eyed penguin",
    description: "The yellow-eyed penguin has yellow eyes"
  },
  {
    name: "Hector Dolphin",
    descritpion: ""
  },
  {
    name: "Paua shellfish",
  },
  {
    name: "Blue Penguin",
  },
];

const App = () => {
  const [selectedCharacter] = useState(null);
  const [story, setStory] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
  

  useEffect(() => {}, [selectedCharacter]);

  return (
    <div className="app">
        <header className="header">
            <h2>New Zealand Ocean Creatures</h2>
            <h4>Meet Our Marine Mates and Their Watery Worlds</h4>
        </header>
        <main className="main">
            <div className="button-container">
                {CHARACTERS.map((character) => (
                    <button
                        className="character-button"
                        ref={buttonRef}
                        key={character.name}
                        onClick={() => handleCharacterSelection(character)}
                    >
                        {character.name}
                    </button>
                ))}
            </div>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {story && <div className="story">{story}</div>}
        </main>
        <footer className="footer">
            <p>Discover the beauty of New Zealand's sea life.</p>
        </footer>
    </div>
);

};

export default App;
