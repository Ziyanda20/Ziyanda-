import { Application } from "express";

import BaseController from "../controllers/base";
import Deliverieservices from "../../services/Delivery";

export default (app: Application) => {
  app.post("/deliveries/get/by/doctor", BaseController.wrapWithUser(Deliverieservices.getByDoctor));
  app.post("/deliveries/get/by/patient", BaseController.wrapWithUser(Deliverieservices.getByPatient));
  app.post("/deliveries/get/by/pharmacy", BaseController.wrapWithUser(Deliverieservices.getByPharmacy));
  app.post("/delivery/assign-driver", BaseController.wrapWithUser(Deliverieservices.assignDriver));
  app.post("/delivery/finish", BaseController.wrapWithUser(Deliverieservices.finish));
};
