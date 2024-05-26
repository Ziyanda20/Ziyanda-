import { Application } from "express";

import BaseController from "../controllers/base";
import prescriptionServices from "../../services/Prescription";

export default (app: Application) => {
  app.post("/prescriptions/add", BaseController.wrapWithUser(prescriptionServices.createPrescription));
  app.post("/prescriptions/remove/one", BaseController.wrapWithUser(prescriptionServices.removePrescription));
  app.post("/prescriptions/get/by/doctor", BaseController.wrapWithUser(prescriptionServices.getAllByDoctor));
  app.post("/prescriptions/get/by/patient", BaseController.wrapWithUser(prescriptionServices.getAllByPatient));
  app.post("/prescriptions/get/one", BaseController.wrapWithUser(prescriptionServices.getOneById));
  app.post("/prescriptions/get/trackers", BaseController.wrapWithUser(prescriptionServices.getTrackerItems));
  app.post("/prescriptions/trackers/take-pill", BaseController.wrap(prescriptionServices.take));
  app.post("/prescriptions/make-ready", BaseController.wrapWithUser(prescriptionServices.makeReady));
  app.post("/prescription/add/delivery-address", BaseController.wrapWithUser(prescriptionServices.assignAddress));
};
