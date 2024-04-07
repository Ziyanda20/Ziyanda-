import express, { Application } from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts"
import "../config/database";
import routes from "../api/routes";


export default async (app: Application) => {
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(`${__dirname}/../../src/views`));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(expressLayouts);

    app.use(express.static(path.join(__dirname, '../../../react/dist')));

    if (process.env.NODE_ENV == "production") {
        const routes = [
            "/doctor/diagnoses",
            "/doctor/prescriptions",
            "/doctor/prescriptions/medicines",
            "/doctor/patients",
            "/doctor/register",
            "/doctor/login"
        ];

        app.get(routes, function (_, res) {
            res.sendFile(path.join(__dirname, '../../../react/dist', 'index.html'));
        });
    }

    routes(app);
};
