import { useEffect, useState, useRef } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

// const API_KEY = process.env.REACT_APP_API_KEY;

const CHARACTERS = [
  {
    name: "yellow-eyed penguin",
  },
  {
    name: "Hector Dolphin",
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
      const response = await fetch(
         "https://api.openai.com/v1/engines/davinci/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": API_KEY,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [message],
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      throw new Error("Error sending message to ChatGPT");
    }
  };

  useEffect(() => {}, [selectedCharacter]);

  return (
    <div>
      <h3>Stories about native sea animals in New Zealand</h3>
      <div>
        {CHARACTERS.map((character) => (
          <button
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
      {story && <div>{story}</div>}
    </div>
  );
};

export default App;
