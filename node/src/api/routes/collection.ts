import { Application } from "express";

import BaseController from "../controllers/base";
import CollectionServices from "../../services/Collection";

export default (app: Application) => {
  app.post("/collections/get/by/doctor", BaseController.wrapWithUser(CollectionServices.getByDoctor));
  app.post("/collections/get/by/patient", BaseController.wrapWithUser(CollectionServices.getByPatient));
};
