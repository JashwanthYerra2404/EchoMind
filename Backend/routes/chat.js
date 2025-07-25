import express from "express";
import Thread from "../models/Thread.js"; 
import getAiResponse from "../utils/Gemini.js";

const router = express.Router();

// Test route to create a thread
router.post("/test", async (req, res) => {
    try{
        const thread = new Thread({
            threadId: "xyzabc",
            title: "Test Thread 2",
        });
        const response = await thread.save();
        res.send(response);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all threads
router.get("/thread", async(req, res) => {
    try{
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        res.json(threads);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get a specific thread by ID
router.get("/thread/:threadId", async (req, res) => {
    try{
        const thread = await Thread.findOne({ threadId: req.params.threadId });
        if(!thread){
            return res.status(404).json({ error: 'Thread not found' });
        }
        res.json(thread.messages);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to delete a thread
router.delete("/thread/:threadId", async (req, res) => {
    try{
        const deletedthread = await Thread.findOneAndDelete({ threadId: req.params.threadId });
        if(!deletedthread){
            return res.status(404).json({ error: 'Thread not found' });
        }
        res.status(200).json({ success: 'Thread deleted successfully' });
    }
    catch (error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to handle chat messages
router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if(!threadId || !message) {
        return res.status(400).json({ error: 'Thread ID and message are required' });
    }

    try {
        let thread = await Thread.findOne({ threadId: threadId});

        if(!thread) {
            // Create a new thread if it doesn't exist
            thread = new Thread({
                threadId: threadId,
                title: message.substring(0, 50),
                messages: [{role: 'user', content: message}]
            });
        }
        else {
            // Update existing thread
            thread.messages.push({ role: 'user', content: message });
            thread.updatedAt = Date.now();
        }

        const reply = await getAiResponse(message);

        thread.messages.push({ role: 'model', content: reply });
        thread.updatedAt = new Date();

        await thread.save();
        res.json({ reply: reply});

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;