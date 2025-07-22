import express, { text } from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}


// app.post('/test', async (req, res) => {
    
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;
//     const options = {
//         method: "POST",
//         headers: {"Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
//         body: JSON.stringify({
//             contents: [
//                 {
//                     role: "user",
//                     parts: [
//                         {
//                             text: req.body.message || "How does AI work?"
//                         }
//                     ]
//                 }
//             ]
//         })
//     }

//     try{
//         const response = await fetch(url, options);
//         const data = await response.json();
//         const content = data.candidates[0].content.parts[0].text; //data.candidates[0].content.role for role
//         res.send(content);
//         // console.log(content);
//     }
//     catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


