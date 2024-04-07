import { Application } from "express";

import BaseController from "../controllers/base";
import medicineServices from "../../services/Medicine";

export default (app: Application) => {
  app.post("/medicines/get/by/prescription", BaseController.wrapWithUser(medicineServices.getAllByPrescription))
};
