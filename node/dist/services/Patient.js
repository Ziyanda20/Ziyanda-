"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Patient_1 = __importDefault(require("../models/Patient"));
const DoctorPatient_1 = __importDefault(require("../models/DoctorPatient"));
const Validation_1 = __importDefault(require("../helpers/Validation"));
const Hasher_1 = __importDefault(require("../helpers/Hasher"));
async function createPatient(body, doctor) {
    try {
        const { name, id } = body;
        Validation_1.default.validate({
            'Full name': { value: name, min: 5, max: 50 },
            'ID': { value: id, min: 13, max: 13 },
        });
        const patient = await Patient_1.default.insert({
            full_name: name,
            id_number: id,
            password: await Hasher_1.default.hash('Password123'),
        });
        await DoctorPatient_1.default.insert({
            doctor_id: doctor.id,
            patient_id: patient.id,
        });
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
async function removePatient(body, doctor) {
    try {
        const { name, patient_id } = body;
        await Patient_1.default.removeOne(patient_id);
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
async function getAllByDoctor(body, doctor) {
    try {
        this.patients = await DoctorPatient_1.default.find({
            condition: { doctor_id: doctor.id },
            join: {
                ref: 'patient',
                condition: {
                    id: { $r: 'doctor_patient.patient_id' },
                    is_deleted: false
                }
            }
        });
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
exports.default = { removePatient, createPatient, getAllByDoctor };
//# sourceMappingURL=Patient.js.map