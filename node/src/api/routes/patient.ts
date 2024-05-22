import { Application } from "express";

import BaseController from "../controllers/base";
import patientServices from "../../services/Patient";

export default (app: Application) => {
  app.post("/patient/login", BaseController.wrap(patientServices.authPatient));
  app.post("/patients/add", BaseController.wrapWithUser(patientServices.createPatient));
  app.post("/patients/remove/one", BaseController.wrapWithUser(patientServices.removePatient));
  app.post("/patients/get/by/doctor", BaseController.wrapWithUser(patientServices.getAllByDoctor));
};
