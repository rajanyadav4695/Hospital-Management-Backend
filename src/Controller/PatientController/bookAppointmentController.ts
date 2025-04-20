import moment from "moment";
import { Doctor } from "../../Entities/Doctor";
import { Appointment } from "../../Entities/Appointment";
import { createResponse } from "../../Helpers/createResponse";
import { Patient } from "../../Entities/Patient";
import { Department } from "../../Entities/Department";

export const addapController = async (req: any, res: any) => {
  try {
    const { patientId, departmentId, doctorId, disease, symptoms, payment, status, appointmentType, date, startTime, } = req.body;
    if (!patientId || !doctorId || !date || !startTime) {  // make sure to don't miss these fields
      // return res.status(400).json({ message: "Missing required fields" });
      return createResponse(res, 400, "Missing required fields", [], false, true)
    }
    const doctor = await Doctor.findOne({ where: { id: doctorId } }); // find the doctor 
    if (!doctor) {
      // return res.status(404).json({ message: "Doctor not found" });
      return createResponse(res, 404, "Doctor not found", [], false, true)
    }
    const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "long" });   // get day of given date "2025-04-11" -> "friday"
    if (!doctor.availableDays || !doctor.availableDays.includes(dayName)) {    // check availability of doctor at that day 
      // return res.status(400).json({ message: `Doctor is not available on ${dayName}` });
      return createResponse(res, 400, `Doctor is not available on ${dayName}`, [], false, true)
    }
    const appointmentStart = moment(`${date} ${startTime}`, "YYYY-MM-DD HH:mm");  // create a timestamp by using moment package "2025-04-11 10:10"
    const appointmentEnd = moment(appointmentStart).add(1, 'hour');  // Busy time of doctor
    const existingAppointments = await Appointment.find({ where: { doctorId, date, }, }); // check database for existing appointments

    // Check for any overlapping time and get the conflicting slot
    const overlappingAppointment = existingAppointments.find((appt) => {
      const apptStart = moment(`${appt.date} ${moment(appt.startTime).format("HH:mm")}`, "YYYY-MM-DD HH:mm");
      const apptEnd = moment(apptStart).add(1, 'hour');
      return appointmentStart.isBefore(apptEnd) && appointmentEnd.isAfter(apptStart); // can not available between start time and end time 
    });

    if (overlappingAppointment) {
      const apptStart = moment(`${overlappingAppointment.date} ${moment(overlappingAppointment.startTime).format("HH:mm")}`, "YYYY-MM-DD HH:mm");
      const apptEndFormatted = apptStart.add(59, 'minutes').format("hh:mm A");  // used to get the max time to display only 

      // return res.status(409).json({
      //   message: `Doctor already has an appointment. Try after ${apptEndFormatted}`,
      // });
      return createResponse(res, 409, `Doctor already has an appointment. Try after ${apptEndFormatted}`, [], false, true) 
    }
    // Create new appointment
    const newAppointment = new Appointment();
    newAppointment.patientId = patientId;
    newAppointment.departmentId = departmentId;
    newAppointment.doctorId = doctorId;
    newAppointment.disease = disease;
    newAppointment.symptoms = symptoms;
    newAppointment.payment = payment;
    newAppointment.status = status;
    newAppointment.appointmentType = appointmentType;
    newAppointment.date = date;
    newAppointment.startTime = appointmentStart.toDate(); // store as full Date object

    await newAppointment.save();

    // return res.status(201).json({
    //   message: "Appointment created successfully",
    //   data: newAppointment,
    // });
    return createResponse(res, 201, "Appointment created successfully", newAppointment, true, false)
  } catch (error) {
    console.error("Error in addapController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const GetaddapByPatientController = async (req: any, res: any) => {
  const {patientId}=req.query;
  const queryBuilder = Appointment.createQueryBuilder('apptbl')
    .select([
      "patient.name","patient.email",//Patient ka data nikal rhe hai
      "department.name", "department.name",//Department ka data nikal rhe hai
      "doctor.name", "doctor.fees", "doctor.profile", "doctor.specialist",
      "apptbl.id", "apptbl.disease", "apptbl.symptoms", "apptbl.status", "apptbl.appointmentType", "apptbl.date", "apptbl.startTime", "apptbl.payment", "apptbl.createdAt"
    ])
    .leftJoin(Patient, "patient", `apptbl.patientId=patient.id::varchar`)
    .leftJoin(Department, "department", `apptbl.departmentId=department.id::varchar`)
    .leftJoin(Doctor, "doctor", `apptbl.doctorId=doctor.id::varchar`)
    .where('apptbl.patientId=:patientId',{patientId:patientId})
    // .orWhere()
    // .limit(1)
    // .offset(2)
    // .orderBy('apptbl.createdAt',"ASC")
    // .addOrderBy
  const result = await queryBuilder.getRawMany()


  res.send(result)
};