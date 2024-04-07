import { Application } from "express";

import userRoutes from "./user";
import doctorRoutes from "./doctor";
import patientRoutes from "./patient";
import diagnosesRoutes from "./diagnoses";
import prescriptionRoutes from "./prescription";
import medicineRoutes from "./medicine";

export default (app: Application): void => {
  userRoutes(app);
  doctorRoutes(app);
  patientRoutes(app);
  diagnosesRoutes(app);
  prescriptionRoutes(app);
  medicineRoutes(app);
};
