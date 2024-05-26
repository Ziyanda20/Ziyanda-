import { Application } from "express";

import BaseController from "../controllers/base";
import patientServices from "../../services/Patient";
import addressServices from "../../services/Address";

export default (app: Application) => {
  app.post("/patient/login", BaseController.wrap(patientServices.authPatient));
  app.post("/patients/add", BaseController.wrapWithUser(patientServices.createPatient));
  app.post("/patients/remove/one", BaseController.wrapWithUser(patientServices.removePatient));
  app.post("/patients/get/by/doctor", BaseController.wrapWithUser(patientServices.getAllByDoctor));
  app.post("/patients/update/address", BaseController.wrapWithUser(addressServices.createOrUpdate));
};
