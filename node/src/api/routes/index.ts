import { Application } from "express";

import userRoutes from "./user";
import employeeRoutes from "./employee";
import patientRoutes from "./patient";
import diagnosesRoutes from "./diagnoses";
import prescriptionRoutes from "./prescription";
import medicineRoutes from "./medicine";
import pharmacyRoutes from "./pharmacy";
import driverRoutes from "./driver";
import deliveryRoutes from "./delivery";

export default (app: Application): void => {
  userRoutes(app);
  employeeRoutes(app);
  patientRoutes(app);
  diagnosesRoutes(app);
  prescriptionRoutes(app);
  medicineRoutes(app);
  pharmacyRoutes(app);
  driverRoutes(app);
  deliveryRoutes(app);
};
