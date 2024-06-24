import { Application } from "express";

import BaseController from "../controllers/base";
import { downloadCSV } from "../../services/Report";

export default (app: Application) => {
  app.post("/download/csv/report", BaseController.wrap(downloadCSV));
};
