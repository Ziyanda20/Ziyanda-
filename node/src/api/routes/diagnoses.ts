import { Application } from "express";

import BaseController from "../controllers/base";
import diagnosesServices from "../../services/Diagnoses";

export default (app: Application) => {
  app.post("/diagnoses/add", BaseController.wrapWithUser(diagnosesServices.createDiagnoses));
  app.post("/diagnoses/remove/one", BaseController.wrapWithUser(diagnosesServices.removeDiagnoses));
  app.post("/diagnoses/get/by/doctor", BaseController.wrapWithUser(diagnosesServices.getAllDiagnosesByDoctor));
};