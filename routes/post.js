import express from "express";

const router = express.Router()

import authMiddleware from "../middlewares/authMiddleware";
import { addPost, deletePost, getAllPosts, getSinglePost, updatePost } from "../controllers/post";

router.post("/addpost", authMiddleware, addPost)
router.get("/getallposts", authMiddleware, getAllPosts)
router.get("/getsinglepost/:id", authMiddleware, getSinglePost)
router.put("/updatepost/:id", authMiddleware, updatePost)
router.delete("/deletepost/:id", authMiddleware, deletePost)

module.exports = router