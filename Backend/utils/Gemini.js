import 'dotenv/config';

const getAiResponse = async (message) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: message || "How does AI work?"
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
            return content;
            // console.log(content);
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}

export default getAiResponse;