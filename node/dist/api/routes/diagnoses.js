"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Diagnosis_1 = __importDefault(require("../../services/Diagnosis"));
exports.default = (app) => {
    app.post("/diagnoses/add", base_1.default.wrapWithUser(Diagnosis_1.default.createDiagnoses));
    app.post("/diagnoses/remove/one", base_1.default.wrapWithUser(Diagnosis_1.default.removeDiagnoses));
    app.post("/diagnoses/get/by/doctor", base_1.default.wrapWithUser(Diagnosis_1.default.getAllDiagnosesByDoctor));
};
//# sourceMappingURL=diagnoses.js.map