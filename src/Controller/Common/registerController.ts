import path from "path";
import { uploadFileHelper } from "../../Helpers/uploadFileHelper";
import { returnUserType } from "../../Helpers/returnUserType";
import { createResponse } from "../../Helpers/createResponse";
export const userRegisterController=async(req:any,res:any)=>{
    try {
        const dataToSave = req.body;
        let {profile}=req.files;
        const pathToSaveFile=path.join(__dirname, '../../Uploads/')
        const profileName= await uploadFileHelper(profile,pathToSaveFile,res)
        const finalData:any={...dataToSave,profile:profileName}
        const TblName:any=await returnUserType(dataToSave?.userType)
        const isExist=await TblName.findOne({ where:{ email:dataToSave?.email}});
        console.log(dataToSave);
        
        if (isExist) {
            return createResponse(res, 208, "User Already Exist !", isExist, false, true)
        } else {
            const result = await TblName.create(finalData); 
            if (result){
                return createResponse(res, 201, "User register successfully !", result, true, false)
            }else{
                return createResponse(res, 404, "User register failed !", result, false, true)
            }
        }
        
    } catch (error:any) {
        if (error) { 
            createResponse(res, 500, "Internal Server Error",error, false, true);
        }
        
    }
}