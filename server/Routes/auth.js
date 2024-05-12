import { Router } from "express";
import { register, login, getMe } from '../Controllers/auth.js'
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router()

//Регистрация 
// http://localhost:4444/api/auth/register
router.post('/register', register) 

// Логин 
//http://localhost:4444/api/auth/login
router.post('/login', login) 

// Get me
router.get('/me', checkAuth, getMe)
// http://localhost:4444/api/auth/me
export default router