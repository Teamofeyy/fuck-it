import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost } from "../Controllers/posts.js";
const router = new Router()

//Create post
// http://localhost:4444/api/auth/register
router.post('/', checkAuth, createPost) 

export default router