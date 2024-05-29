import { Application } from "express";

import BaseController from "../controllers/base";
import driverServices from "../../services/Driver";

export default (app: Application) => {
  app.post("/driver/login", BaseController.wrap(driverServices.authDriver));
  app.post("/driver/register", BaseController.wrapWithUser(driverServices.createDriver));
  app.post("/drivers/get/by/pharmacy", BaseController.wrapWithUser(driverServices.getDrivers));
};
