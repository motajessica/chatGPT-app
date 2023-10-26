// GeneratedText.jsx

import React, { useState } from "react";

const GeneratedText = ({ character }) => {
  const [story, setStory] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCharacterSelection = async (selectedCharacter) => {
    const role = "system";
    const content = `Create a kids story for a 3 years old kid about the ${selectedCharacter.name} sea animal. Say some real fact about this New Zealand sea animal, and keep it at a maximum of 30 words`;

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

  // Use the effect hook to trigger the GPT request when a character is selected
  React.useEffect(() => {
    if(character) {
      handleCharacterSelection(character);
    }
  }, [character]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {story && <div className="story">{story}</div>}
    </div>
  );
};

export default GeneratedText;
