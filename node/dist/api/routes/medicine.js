"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../controllers/base"));
const Medicine_1 = __importDefault(require("../../services/Medicine"));
exports.default = (app) => {
    app.post("/medicines/get/by/prescription", base_1.default.wrapWithUser(Medicine_1.default.getAllByPrescription));
};
//# sourceMappingURL=medicine.js.map