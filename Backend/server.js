import express, { text } from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/test', async (req, res) => {
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: req.body.message || "How does AI work?"
                        }
                    ]
                }
            ]
        })
    }

    try{
        const response = await fetch(url, options);
        const data = await response.json();
        const content = data.candidates[0].content.parts[0].text; //data.candidates[0].content.role for role
        res.send(content);
        // console.log(content);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// import { GoogleGenAI } from '@google/genai';
// import 'dotenv/config';

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: 'gemini-2.0-flash-001',
//     contents: 'Can you explain dynamic programming in detail?',
//   });
//   console.log(response.text);
// }

// main();

