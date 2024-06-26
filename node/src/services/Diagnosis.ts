import Diagnoses from "../models/Diagnosis";

import v from "../helpers/Validation";
import { getDayDifference } from "../helpers/Datetime";

import { IAny, IResponse } from "../interfaces";

async function createDiagnoses(body: any, doctor: any): Promise<IResponse> {
  try {
    const { name, patient_id } = body;

    if (patient_id == 'select') throw 'Please select patient';

    v.validate({
      'Diagnoses': { value: name, min: 5, max: 100 },
    });

    let lastDiagnosis = await Diagnoses.getLastByPatient(patient_id);

    if (lastDiagnosis && getDayDifference(lastDiagnosis.date_created) < 30) {
      throw 'Patient was recently diagnosed';
    }

    const diagnose = await Diagnoses.insert({
      name,
      employee_id: doctor.id,
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
      condition: { employee_id: doctor.id, is_deleted: false },
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

async function searchAllDiagnosesByDoctor(body: any, doctor: any): Promise<IResponse> {
  try {
    const diagnoses = await Diagnoses.raw(`
      SELECT * FROM diagnosis
      INNER JOIN patient ON patient.id = diagnosis.patient_id
      WHERE diagnosis.name LIKE '%${body.query}%'
    `)

    this.diagnoses = diagnoses;

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

export default { removeDiagnoses, createDiagnoses, getAllDiagnosesByDoctor, searchAllDiagnosesByDoctor };
