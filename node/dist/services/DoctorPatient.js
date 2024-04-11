"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Patient_1 = __importDefault(require("../models/Patient"));
const Validation_1 = __importDefault(require("../helpers/Validation"));
const Hasher_1 = __importDefault(require("../helpers/Hasher"));
async function createPatient(body, doctor) {
    try {
        const { name, id } = body;
        Validation_1.default.validate({
            'Full name': { value: name, min: 5, max: 50 },
            'ID': { value: id, min: 13, max: 13 },
        });
        const newUser = await Patient_1.default.insert({
            name: name,
            id_number: id,
            password: await Hasher_1.default.hash('Password123'),
        });
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
exports.default = { createPatient };
//# sourceMappingURL=DoctorPatient.js.map