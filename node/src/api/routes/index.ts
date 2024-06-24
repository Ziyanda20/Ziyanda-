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
import reportRoutes from "./report";

export default (app: Application): void => {
  pharmacyRoutes(app);
  driverRoutes(app);
  userRoutes(app);
  employeeRoutes(app);
  patientRoutes(app);
  diagnosesRoutes(app);
  prescriptionRoutes(app);
  medicineRoutes(app);
  deliveryRoutes(app);
  reportRoutes(app);
};
