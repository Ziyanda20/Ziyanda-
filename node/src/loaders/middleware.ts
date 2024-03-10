import { Application } from "express";
import { loadUserInfo } from "../middleware";

import cookieParser from "cookie-parser";

export default (app: Application) => {
  app.use(cookieParser());

  app.use((req, res, next) => {
    res.set({
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Allow",
      SameSite: "None",
      Secure: "",
    });

    next();
  });

  app.use(/^((?!(assets)).)*$/, loadUserInfo);
};
