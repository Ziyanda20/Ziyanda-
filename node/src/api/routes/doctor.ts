import { Application } from "express";

import BaseController from "../controllers/base";
import doctorServices from "../../services/Doctor";

export default (app: Application) => {
  app.post("/doctor/register", BaseController.wrap(doctorServices.createDoctor));

  app.post("/doctor/login", BaseController.wrap(doctorServices.authDoctor));
};
