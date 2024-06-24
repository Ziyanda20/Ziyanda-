import { Application } from "express";

import BaseController from "../controllers/base";
import patientServices from "../../services/Patient";

export default (app: Application) => {
  app.post("/patient/login", BaseController.wrap(patientServices.authPatient));
  app.post("/patient/update/address", BaseController.wrapWithUser(patientServices.updateAddress));
  app.post("/patient/update/profile", BaseController.wrapWithUser(patientServices.updateProfile));
  app.post("/patient/update/password", BaseController.wrapWithUser(patientServices.updatePassword));
  app.post("/patients/add", BaseController.wrapWithUser(patientServices.createPatient));
  app.post("/patients/remove/one", BaseController.wrapWithUser(patientServices.removePatient));
  app.post("/patients/get/by/hospital", BaseController.wrapWithUser(patientServices.getAllByHospital));
  app.post("/patients/search/by/hospital", BaseController.wrapWithUser(patientServices.searchAllByHospital));
};
