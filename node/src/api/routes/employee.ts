import { Application } from "express";

import BaseController from "../controllers/base";
import doctorServices from "../../services/Employee";

export default (app: Application) => {
  app.post("/employee/register", BaseController.wrap(doctorServices.createAdmin));
  app.post("/employee/login", BaseController.wrap(doctorServices.authEmployee));
  app.post("/employee/register/doctor", BaseController.wrapWithUser(doctorServices.createDoctor));
  app.post("/employees/get/doctors/by/hospital", BaseController.wrapWithUser(doctorServices.getDoctors));
};
