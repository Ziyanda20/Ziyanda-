import { Application } from "express";

import BaseController from "../controllers/base";
import pharmacyServices from "../../services/Pharmacy";

export default (app: Application) => {
  app.post("/pharmacies/get/all", BaseController.wrap(pharmacyServices.getPharmacies));
  app.post("/pharmacist/register", BaseController.wrap(pharmacyServices.createPharmacist));
  app.post("/pharmacist/login", BaseController.wrap(pharmacyServices.authPharmacist));
};
