import { Department } from "../../Entities/Department"; 
import { createResponse } from "../../Helpers/createResponse";
export const addDepartmentController = async (req: any, res: any) => {
    const { name}:any=req.body; 
  const isExist=await Department.findOne({where:{name}})             
  if(isExist == name){
   return createResponse(res, 200, "Department Already exist !", isExist, false, true)
  }else{
   const result=await  Department.save({name});
   return createResponse(res, 201, "Department created successfully", result, false, true)
  }
  
}

export const getDepartmentController = async (req: any, res: any) => {  
try{
  const result=await Department.find()             
  if(result?.length>0){
   return createResponse(res, 200, "Department fetched successfully !", result, true, false)
  }else{
    return createResponse(res, 404, "Department not found", result, false, true)
  } 
}catch(err:any){
  return createResponse(res, 500, "Internal server error", [], false, true)
}
}

//delete department
export const deleteDepartmentController = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const department = await Department.findOne({ where: { id } });

    if (!department) {
      return createResponse(res, 404, "Department not found", [], false, true);
    }

    await Department.remove(department);

    return createResponse(res, 200, "Department deleted successfully", [], true, false);
  } catch (err: any) {
    return createResponse(res, 500, "Internal server error", [], false, true);
  }
};

// Update Department
export const updateDepartmentController = async (req: any, res: any) => {
  const { id } = req.params;
  const { name }: any = req.body;

  try {
    const department = await Department.findOne({ where: { id } });

    if (!department) {
      return createResponse(res, 404, "Department not found", [], false, true);
    }

    department.name = name;
    const updated = await Department.save(department);

    return createResponse(res, 200, "Department updated successfully", updated, true, false);
  } catch (err: any) {
    return createResponse(res, 500, "Internal server error", [], false, true);
  }
};