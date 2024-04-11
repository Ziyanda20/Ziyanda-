"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Prescription_1 = __importDefault(require("../models/Prescription"));
const Diagnosis_1 = __importDefault(require("../models/Diagnosis"));
const Medicine_1 = __importDefault(require("../models/Medicine"));
const DosageTracker_1 = __importDefault(require("../models/DosageTracker"));
async function createPrescription(body, doctor) {
    try {
        const { name, diagnosis_id, medicine_count } = body;
        const diagnosis = await Diagnosis_1.default.findOne({
            condition: {
                id: diagnosis_id
            }
        });
        if (!diagnosis)
            throw 'Could not find diagnosis';
        const prescription = await Prescription_1.default.insert({
            diagnosis_id,
            patient_id: diagnosis.patient_id,
            doctor_id: doctor.id
        });
        for (let index = 0; index < medicine_count; index++) {
            let name = body[`name_${index}`];
            let dosage = body[`dosage_${index}`];
            let days = body[`days_${index}`];
            const med = await Medicine_1.default.insert({
                prescription_id: prescription.id,
                name,
                dosage,
                days
            });
            for (let day = 0; day < parseInt(days); day++) {
                await DosageTracker_1.default.insert({
                    prescription_id: prescription.id,
                    medicine_id: med.id
                });
            }
        }
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
async function removePrescription(body, doctor) {
    try {
        const { prescription_id } = body;
        await Prescription_1.default.removeOne(prescription_id);
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
async function getAllByDoctor(body, doctor) {
    try {
        this.prescriptions = await Prescription_1.default.find({
            condition: { doctor_id: doctor.id, is_deleted: false },
            join: [
                {
                    ref: 'patient',
                    id: 'patient_id'
                },
                {
                    ref: 'diagnoses',
                    id: 'diagnosis_id'
                }
            ]
        });
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
async function getOneById(body, doctor) {
    try {
        const prescription = await Prescription_1.default.findOne({
            condition: { id: body.prescription_id, is_deleted: false },
            join: [
                {
                    ref: 'patient',
                    id: 'patient_id'
                },
                {
                    ref: 'diagnoses',
                    id: 'diagnosis_id'
                }
            ]
        });
        this.prescription = prescription ? prescription.toObject() : null;
        this.successful = true;
    }
    catch (error) {
        throw error;
    }
    return this;
}
exports.default = { removePrescription, createPrescription, getAllByDoctor, getOneById };
//# sourceMappingURL=Prescription.js.map