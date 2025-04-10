import { createResponse } from "../../Helpers/createResponse";
import { returnUserType } from "../../Helpers/returnUserType";

export const resetPassswordController = async (req: any, res: any) => {
    const { token, password, userType } = req.body;
    const TblName: any = await returnUserType(userType);
    const isTokenNotExpired = await TblName.findOne({ where: { token } });
    if (isTokenNotExpired) {
        const tokenIssueTime = new Date(isTokenNotExpired?.updatedAt).getTime()
        const cuurentTime = Date.now();
        const expTime = 300000;
        if ((cuurentTime - tokenIssueTime) >= expTime) {
            await TblName.update({ token }, { token: '' })
            return createResponse(res, 404, "Link has been Expired!", [], false, true);
        } else {
            await TblName.update({ token }, { password: password, token: '' })
            return createResponse(res, 200, "Password  has been Updated successfully!", [], false, true);
        } 
    } else {
        return createResponse(res, 404, "Token has been Expired!", [], false, true);
    } 
}