 /*const express = require('express');

const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:3001'  // React dev server
}));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ error: "Message is required" });

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 200
            })
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            const aiReply = data.choices[0].message.content;
            res.json({ reply: aiReply });
        } else {
            res.json({ reply: "No response from AI" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
*/


const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // React frontend alag port (3001) se request bhej sakta hai
app.use(express.json());

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log("Frontend sent message:", userMessage);

    if (!userMessage) {
        console.log("Empty message received");
        return res.status(400).json({ error: "Message is empty" });
    }

    try {
        console.log("Sending request to OpenAI API...");
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 200
            })
        });

        if (!response.ok) {
            console.error("OpenAI API returned error status:", response.status);
            const text = await response.text();
            console.error("Response text:", text);
            return res.status(500).json({ error: "OpenAI API error" });
        }

        const data = await response.json();
        console.log("OpenAI API response data:", data);

        const aiReply = data.choices?.[0]?.message?.content || "No reply from AI";
        console.log("Sending reply to frontend:", aiReply);
        res.json({ reply: aiReply });

    } catch (error) {
        console.error("Backend error:", error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
