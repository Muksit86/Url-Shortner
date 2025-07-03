import express from 'express';
import { handleLogin, handleRegistration, InputFieldChecking } from '../Controllers/user.js';

const userRouter = express.Router()

userRouter.post('/registration', handleRegistration)
userRouter.post('/login', handleLogin)
userRouter.post('/inputfeilds', InputFieldChecking)

export default userRouter