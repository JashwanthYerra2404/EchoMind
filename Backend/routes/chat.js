import express from "express";
import User from "../models/Thread.js"; 
import getAiResponse from "../utils/Gemini.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// Test route to create a thread
router.post("/test", async (req, res) => {
    try{
        const curruserId = req.user._id;
        const curruser = await User.findById(curruserId);

        if (!curruser) {
            return res.status(404).json({ error: 'User not found' });
        }

        curruser.threads.push({
            threadId: "jshfuhsf",
            title: "Test thread 2"
        });
        // const thread = new Thread({
        //     threadId: "xyzabc",
        //     title: "Test Thread 2",
        // });
        const response = await curruser.save();
        res.send(response);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error in test' });
    }
});

// Route to get all threads
router.get("/thread", async(req, res) => {
    try{
        const curruserId = req.user._id;
        const curruser = await User.findById(curruserId);

        if (!curruser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const threads = [...curruser.threads].sort((a, b) => 
            new Date(b.updatedAt) - new Date(a.updatedAt)
        );

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
        const curruser = await User.findById(req.user._id);
        
        if(!curruser){
            return res.status(404).json({error : "User not found "});
        }

        const thread = curruser.threads.find(thread => thread.threadId === req.params.threadId);
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
        const curruser = await User.findById(req.user._id);
        if(!curruser) {
            return res.status(404).json({error: "User not found"});
        }

        const indexToRemove = curruser.threads.findIndex(thread => thread.threadId === req.params.threadId);

        if(indexToRemove === -1){
            return res.status(404).json({ error: 'Thread not found' });
        }
        
        curruser.threads.splice(indexToRemove, 1);

        await curruser.save();

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
        const curruserId = req.user._id;
        const curruser = await User.findById(curruserId);

        if (!curruser) {
            return res.status(404).json({ error: 'User not found' });
        }

        let thread = curruser.threads.find(t => t.threadId === threadId);

        if(!thread) {
            // Create a new thread if it doesn't exist
            curruser.threads.push({
                threadId: threadId,
                title: message.substring(0, 50),
                messages: [{role: 'user', content: message}]
            });
            thread = curruser.threads[curruser.threads.length - 1];
        }
        else {
            // Update existing thread
            thread.messages.push({ role: 'user', content: message });
            thread.updatedAt = Date.now();
        }

        const reply = await getAiResponse(message);

        thread.messages.push({ role: 'model', content: reply });
        thread.updatedAt = new Date();

        await curruser.save();
        res.json({ reply: reply});

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;