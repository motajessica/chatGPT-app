import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ message: "Server is running!" });
});

const API_KEY = process.env.API_KEY

app.post('/api/story', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [message],
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching story:", error);
    res.status(500).json({ error: "Error fetching story" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
