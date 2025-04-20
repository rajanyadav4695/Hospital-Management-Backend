import express from 'express';
import { userLogin } from '../Controller/Common/loginController';
import { userRegisterController } from '../Controller/Common/registerController';
import { ForgetPassswordController } from '../Controller/Common/forgetPassswordController';
import { resetPassswordController } from '../Controller/Common/resetPasswordController';
import { verifyToken } from '../Middleware/Verifytoken';
import { addDepartmentController, getDepartmentController } from '../Controller/AdminController/DepartmentController';
import { getDoctorBydepartmentIdController } from '../Controller/DoctorController/DepartmentController';
import {  addapController, GetaddapByPatientController } from '../Controller/PatientController/bookAppointmentController';
export const route=express.Router()

//common router
route.post("/login",userLogin)
route.post('/register',userRegisterController)
route.post("/forget-password",ForgetPassswordController)
route.post('/reset-password', resetPassswordController)

//admin route
route.post('/admin-add-department',verifyToken, addDepartmentController);
route.get('/admin-get-department',verifyToken, getDepartmentController);

//doctor route
route.get('/get-doctor-by-departmentId',verifyToken, getDoctorBydepartmentIdController);

//patient route
route.post('/doctor-appointment-book',verifyToken, addapController);
route.get('/get-appointment-by-patient',verifyToken, GetaddapByPatientController); 