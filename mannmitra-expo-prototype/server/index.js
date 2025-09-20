require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(rateLimit({ windowMs: 60*1000, max: 120 }));

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.length > 4000) return res.status(400).json({ error: 'Invalid input' });

    // Forward to OpenAI (replace with correct endpoint/model if using Gemini)
    const openaiResp = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [ { role: 'system', content: 'You are a compassionate Indian youth mental wellness assistant.' }, { role: 'user', content: message } ],
      max_tokens: 250
    }, { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } });

    const reply = openaiResp.data.choices?.[0]?.message?.content || 'Sorry, I could not generate a reply.';
    res.json({ reply });
  } catch (e) {
    console.error('Chat error', e?.response?.data || e.message);
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening ${port}`));
