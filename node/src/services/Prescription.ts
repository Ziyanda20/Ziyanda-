import Prescription from "../models/Prescription";
import Diagnoses from "../models/Diagnoses";
import Medicine from "../models/Medicine";
import DosageTracker from "../models/DosageTracker";

import v from "../helpers/Validation";

import { IAny, IResponse } from "../interfaces";

async function createPrescription(body: any, doctor: any): Promise<IResponse> {
  try {
    const { name, diagnosis_id, medicine_count } = body;

    const diagnosis = await Diagnoses.findOne({
      condition: {
        id: diagnosis_id
      }
    })

    if (!diagnosis) throw 'Could not find diagnosis';

    const prescription = await Prescription.insert({
      diagnosis_id,
      patient_id: diagnosis.patient_id,
      doctor_id: doctor.id
    })

    for (let index = 0; index < medicine_count; index++) {
      let name = body[`name_${index}`];
      let dosage = body[`dosage_${index}`];
      let days = body[`days_${index}`];

      const med = await Medicine.insert({
        prescription_id: prescription.id,
        name,
        dosage,
        days
      })

      for (let day = 0; day < parseInt(days); day++) {
        await DosageTracker.insert({
          prescription_id: prescription.id,
          medicine_id: med.id
        })
      }
    }

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function removePrescription(body: any, doctor: any): Promise<IResponse> {
  try {
    const { prescription_id } = body;

    await Prescription.removeOne(prescription_id);

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getAllByDoctor(body: any, doctor): Promise<IResponse> {
  try {
    this.prescriptions = await Prescription.find({
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
    })

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getOneById(body: any, doctor): Promise<IResponse> {
  try {
    const prescription = await Prescription.findOne({
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
    })

    this.prescription = prescription ? prescription.toObject() : null;

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

export default { removePrescription, createPrescription, getAllByDoctor, getOneById };
