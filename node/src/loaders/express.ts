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

    if (true) {
        app.use(express.static(path.join(__dirname, '../../../react/dist')));

        const routes = [
            "/hospital/doctors",
            "/hospital/patients",

            "/doctor/diagnoses",
            "/doctor/prescriptions",
            "/doctor/prescriptions/medicines",

            "/hospital/register",
            "/employee/login",

            "/login",
            "/patient/profile",
            "/patient/address",
            "/patient/deliveries" ,
            "/patient/prescriptions",
            "/patient/prescriptions/medicines",
            "/patient/prescriptions/medicines/tracker",

            "/pharmacy/register",
            "/pharmacy/login",
            "/pharmacy/deliveries",
            "/pharmacy/prescriptions",
            "/pharmacy/prescriptions/medicines",
            "/pharmacy/drivers",

            "/driver/login",
            "/driver/deliveries",

        ]

        app.get(routes, function (_, res) {
            res.sendFile(path.join(__dirname, '../../../react/dist', 'index.html'));
        });
    }

    routes(app);
};
