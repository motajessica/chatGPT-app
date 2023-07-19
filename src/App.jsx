import { useEffect, useState, useRef } from "react";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const API_KEY = "844e657230b741b3ae77b4ff9bf22df4";

const CHARACTERS = [
  {
    name: "Keruru",
  },
  {
    name: "Tui",
  },
  {
    name: "Pukeko",
  },
  {
    name: "Weka",
  },
];

const App = () => {
  const [selectedCharacter] = useState(null);
  const [story, setStory] = useState("");
  const [error, setError] = useState(null);
  const buttonRef = useRef(null);

  const handleCharacterSelection = async (character) => {
    const role = "system";
    const content = `Create a kids story for a 3 years old kid about the ${character.name} bird. Say some real fact about this new zealand bird, and keep it at maximum 30 words. The story should be linked to the Tic Tac Toe Game`;

    const message = { role, content };

    try {
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
    }
  };

  const sendMessageToChatGPT = async (message) => {
    try {
      const response = await fetch(
        "https://te-wao-nui-story.openai.azure.com/openai/deployments/te-wao-nui-storyline/chat/completions?api-version=2023-03-15-preview",
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
      <h3>Kids-Friendly Stories about native birds and kaitiaki characters</h3>
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
      {error && <div>{error}</div>}
      {story && <div>{story}</div>}
    </div>
  );
};

export default App;
