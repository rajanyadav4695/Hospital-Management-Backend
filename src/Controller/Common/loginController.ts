import { createResponse } from "../../Helpers/createResponse";
import { returnUserType } from "../../Helpers/returnUserType";
import jsonwebtoken from 'jsonwebtoken'

export const userLogin = async (req: any, res: any) => {
try {
  const { email, password, userType } = req.body;
  const tableName: any = await returnUserType(userType);
  const result = await tableName.findOne({ where: { email, password } });
  const jwtToken = await jsonwebtoken.sign({ id: result?.id, email: result?.email }, `${process.env.JWT_SECRET}`, { expiresIn: '2h' })
  const finalResult = { ...result, jwtToken }
  if(result){
    return createResponse(res, 200, "Login success", finalResult, true, false)
} else {
    return createResponse(res, 404, "Login FIALED!", [], false, true)
}
} catch (error) {
  return createResponse(res,500,"Internal Server Error",error,false,true)
}
};
