import express from "express";
import Thread from "../models/Thread.js"; 

const router = express.Router();

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

router.get("/thread/:threadId", async (req, res) => {
    try{
        const thread = await Thread.findOne({ threadId: req.params });
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

router.delete("/thread/:threadId", async (req, res) => {
    try{
        const deletedthread = await Thread.findOneAndDelete({ threadId: req.params });
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


export default router;