import { Application } from "express";

import BaseController from "../controllers/base";
import Deliverieservices from "../../services/Delivery";

export default (app: Application) => {
  app.post("/deliveries/get/by/doctor", BaseController.wrapWithUser(Deliverieservices.getByDoctor));
  app.post("/deliveries/get/by/patient", BaseController.wrapWithUser(Deliverieservices.getByPatient));
};
