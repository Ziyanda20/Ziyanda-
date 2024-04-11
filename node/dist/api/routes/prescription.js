"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Prescription_1 = __importDefault(require("../../services/Prescription"));
exports.default = (app) => {
    app.post("/prescriptions/add", base_1.default.wrapWithUser(Prescription_1.default.createPrescription));
    app.post("/prescriptions/remove/one", base_1.default.wrapWithUser(Prescription_1.default.removePrescription));
    app.post("/prescriptions/get/by/doctor", base_1.default.wrapWithUser(Prescription_1.default.getAllByDoctor));
    app.post("/prescriptions/get/one", base_1.default.wrapWithUser(Prescription_1.default.getOneById));
};
//# sourceMappingURL=prescription.js.map