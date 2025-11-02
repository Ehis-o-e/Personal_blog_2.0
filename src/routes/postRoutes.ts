import express, { Router } from "express";
import { 
    createPost, 
    getAllPosts, 
    getPostById, 
    updatePost, 
    deletePost 
} from "../controllers/postControllers.js";

const router: Router = express.Router();

router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;