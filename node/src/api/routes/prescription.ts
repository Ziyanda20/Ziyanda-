import { Application } from "express";

import BaseController from "../controllers/base";
import prescriptionServices from "../../services/Prescription";

export default (app: Application) => {
  app.post("/prescriptions/add", BaseController.wrapWithUser(prescriptionServices.createPrescription));
  app.post("/prescriptions/remove/one", BaseController.wrapWithUser(prescriptionServices.removePrescription));
  app.post("/prescriptions/get/by/doctor", BaseController.wrapWithUser(prescriptionServices.getAllByDoctor));
  app.post("/prescriptions/get/one", BaseController.wrapWithUser(prescriptionServices.getOneById));
};
