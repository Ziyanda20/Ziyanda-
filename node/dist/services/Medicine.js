"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Medicine_1 = __importDefault(require("../models/Medicine"));
async function getAllByPrescription(body, doctor) {
    try {
        const medicines = await Medicine_1.default.find({
            condition: { prescription_id: body.prescription_id }
        });
        this.medicines = medicines;
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
exports.default = { getAllByPrescription };
//# sourceMappingURL=Medicine.js.map