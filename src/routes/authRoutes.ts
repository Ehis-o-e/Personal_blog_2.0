import express, { Router } from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const router:Router = express.Router();

router.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (username === adminUsername && password === adminPassword) {
        res.json({ 
            success: true, 
            message: "Login successful!" 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: "Wrong credentials" 
        });
    }
});

export default router;