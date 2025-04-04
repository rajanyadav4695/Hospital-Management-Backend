import { createResponse } from "../../Helpers/createResponse";
import { returnUserType } from "../../Helpers/returnUserType";
import { createRandomString, sendForgetPasswordMail } from "../../Helpers/SendMailForgetpassword";

export const ForgetPassswordController=async(req:any,res:any)=>{
    const {email, userType} =req.body;
    const TblName: any = await returnUserType(userType); 
    const isExist=await TblName.findOne({where:{email}})
     if(isExist){ 
      const token= createRandomString(); 
      await TblName.update({email:email},{ token})
      await  sendForgetPasswordMail(email,token)
      return   createResponse(res, 200, "Mail send Successfull !",[], true, false);
     }else{
      return   createResponse(res, 404, "User Not Found!",[], false, true);
  }
  }