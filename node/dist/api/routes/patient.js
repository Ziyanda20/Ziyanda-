"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Patient_1 = __importDefault(require("../../services/Patient"));
exports.default = (app) => {
    app.post("/patients/add", base_1.default.wrapWithUser(Patient_1.default.createPatient));
    app.post("/patients/remove/one", base_1.default.wrapWithUser(Patient_1.default.removePatient));
    app.post("/patients/get/by/doctor", base_1.default.wrapWithUser(Patient_1.default.getAllByDoctor));
};
//# sourceMappingURL=patient.js.map