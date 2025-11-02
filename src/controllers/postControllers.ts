import type{ PostInput, Post } from "../type.js";
import type { Request, Response } from 'express';
import PostModel from "../model/post.js";

// Get next ID for new post
async function getNextId(): Promise<number> {
    const lastPost = await PostModel.findOne().sort({ id: -1 });
    return lastPost ? lastPost.id + 1 : 1;
}

export async function createPost(req: Request, res: Response){
   try{ 
    const { title, content }: PostInput = req.body;

    const nextId = await getNextId();
    
    const postData: Post = {
        id: nextId,
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const newPost = new PostModel(postData);
    await newPost.save();

    res.status(201).json({
        message: "Post created successfully!",
        post: newPost
    });

    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
}

export async function getAllPosts(req: Request, res: Response) {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
}

export async function getPostById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const post = await PostModel.findOne({ id: Number(id) });
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        res.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Failed to fetch post" });
    }
}

export async function updatePost(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { title, content }: PostInput = req.body;
        
        const post = await PostModel.findOne({ id: Number(id) });
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        // Update fields
        if (title) post.title = title;
        if (content) post.content = content;
        post.updatedAt = new Date();
        
        await post.save();
        
        res.json({
            message: "Post updated successfully!",
            post
        });
        
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Failed to update post" });
    }
}

export async function deletePost(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const post = await PostModel.findOneAndDelete({ id: Number(id) });
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        res.json({ message: "Post deleted successfully!" });
        
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Failed to delete post" });
    }
}




