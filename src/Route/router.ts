import express from 'express';
import { userLogin } from '../Controller/Common/loginController';
export const route=express.Router()

//common router
route.post("/login",userLogin)

//admin route


//doctor route


//patient route