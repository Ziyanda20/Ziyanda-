import Diagnoses from "../models/Diagnosis";

import v from "../helpers/Validation";

import { IAny, IResponse } from "../interfaces";

async function createDiagnoses(body: any, doctor: any): Promise<IResponse> {
  try {
    const { name, patient_id } = body;

    v.validate({
      'Diagnoses': { value: name, min: 5, max: 100 },
    });

    const diagnose = await Diagnoses.insert({
      name,
      doctor_id: doctor.id,
      patient_id
    });

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function removeDiagnoses(body: any, doctor: any): Promise<IResponse> {
  try {
    const { diagnoses_id } = body;

    await Diagnoses.removeOne(diagnoses_id);

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getAllDiagnosesByDoctor(body: any, doctor: any): Promise<IResponse> {
  try {
    const diagnoses = await Diagnoses.find({
      condition: { doctor_id: doctor.id, is_deleted: false },
      join: [
        {
          ref: 'patient',
          id: 'patient_id'
        }
      ]
    })

    this.diagnoses = diagnoses;

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

export default { removeDiagnoses, createDiagnoses, getAllDiagnosesByDoctor };
