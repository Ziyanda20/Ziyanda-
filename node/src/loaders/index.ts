import { Application } from "express";

import expressLoader from "./express"
import middlewareLoader from "./middleware";
import cron from "./cron";

export default (app: Application) => {
    middlewareLoader(app);
    expressLoader(app)
    cron()
}