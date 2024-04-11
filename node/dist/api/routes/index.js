"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const doctor_1 = __importDefault(require("./doctor"));
const patient_1 = __importDefault(require("./patient"));
const diagnoses_1 = __importDefault(require("./diagnoses"));
const prescription_1 = __importDefault(require("./prescription"));
const medicine_1 = __importDefault(require("./medicine"));
exports.default = (app) => {
    (0, user_1.default)(app);
    (0, doctor_1.default)(app);
    (0, patient_1.default)(app);
    (0, diagnoses_1.default)(app);
    (0, prescription_1.default)(app);
    (0, medicine_1.default)(app);
};
//# sourceMappingURL=index.js.map