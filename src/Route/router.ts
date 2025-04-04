import express from 'express';
import { userLogin } from '../Controller/Common/loginController';
import { userRegisterController } from '../Controller/Common/registerController';
import { ForgetPassswordController } from '../Controller/Common/forgetPassswordController';
export const route=express.Router()

//common router
route.post("/login",userLogin)
route.post('/register',userRegisterController)
route.post("/forget-password",ForgetPassswordController)

//admin route


//doctor route


//patient route