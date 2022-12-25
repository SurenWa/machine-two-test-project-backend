import express from "express";

const router = express.Router()

import authMiddleware from "../middlewares/authMiddleware";
import { addComment } from "../controllers/comment";

router.post("/addcomment", authMiddleware, addComment)
module.exports = router