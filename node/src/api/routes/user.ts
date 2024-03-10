import { Application, Request, Response } from "express";

import BaseController from "../controllers/base";
import userServices from "../../services/User";

export default (app: any) => {
  app.post(
    "/user/get/by/session",
    BaseController.wrapWithUser(userServices.getUserSession)
  );

  app.post(
    "/logout",
    (req, res: Response, next) => {
      res.clearCookie('_pharma_sesh')

      res.json({
        successful: true
      })
    }
  );
};
