import { Application } from "express";

import userRoutes from "./user";
import doctorRoutes from "./doctor";

export default (app: Application): void => {
  userRoutes(app);
  doctorRoutes(app);
};
