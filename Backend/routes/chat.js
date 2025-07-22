import express from "express";
import Thread from "../models/Thread.js"; 

const router = express.Router();

router.post("/test", async (req, res) => {
    try{
        const thread = new Thread({
            threadId: "xyz",
            title: "Test Thread",
        });
        const response = await thread.save();
        res.send(response);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;