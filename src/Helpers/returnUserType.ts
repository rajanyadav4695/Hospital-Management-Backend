import { Admin } from "../Entities/Admin";
import { Doctor } from "../Entities/Doctor";
import { Patient } from "../Entities/Patient";

export const returnUserType = (userType: any) => {
    if (userType === "admin") {
      return Admin;
    } else if (userType === "doctor") {
      return Doctor;
    } else {
      return Patient;
    }
  };