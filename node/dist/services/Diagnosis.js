"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Diagnosis_1 = __importDefault(require("../models/Diagnosis"));
const Validation_1 = __importDefault(require("../helpers/Validation"));
async function createDiagnoses(body, doctor) {
    try {
        const { name, patient_id } = body;
        Validation_1.default.validate({
            'Diagnoses': { value: name, min: 5, max: 100 },
        });
        const diagnose = await Diagnosis_1.default.insert({
            name,
            doctor_id: doctor.id,
            patient_id
        });
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
async function removeDiagnoses(body, doctor) {
    try {
        const { diagnoses_id } = body;
        await Diagnosis_1.default.removeOne(diagnoses_id);
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
async function getAllDiagnosesByDoctor(body, doctor) {
    try {
        const diagnoses = await Diagnosis_1.default.find({
            condition: { doctor_id: doctor.id, is_deleted: false },
            join: [
                {
                    ref: 'patient',
                    id: 'patient_id'
                }
            ]
        });
        this.diagnoses = diagnoses;
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
exports.default = { removeDiagnoses, createDiagnoses, getAllDiagnosesByDoctor };
//# sourceMappingURL=Diagnosis.js.map