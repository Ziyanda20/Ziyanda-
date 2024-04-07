import Patient from "../models/Patient";
import DoctorPatient from "../models/DoctorPatient";

import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";

import { IAny, IResponse } from "../interfaces";

async function createPatient(body: any, doctor): Promise<IResponse> {
  try {
    const { name, id } = body;

    v.validate({
      'Full name': { value: name, min: 5, max: 50 },
      'ID': { value: id, min: 13, max: 13 },
    });

    const patient = await Patient.insert({
      full_name: name,
      id_number: id,
      password: await hasher.hash('Password123'),
    });

    await DoctorPatient.insert({
      doctor_id: doctor.id,
      patient_id: patient.id,
    })

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function removePatient(body: any, doctor): Promise<IResponse> {
  try {
    const { name, patient_id } = body;

    await Patient.removeOne(patient_id);

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getAllByDoctor(body: any, doctor): Promise<IResponse> {
  try {
    this.patients = await DoctorPatient.find({
      condition: { doctor_id: doctor.id },
      join: {
        ref: 'patient',
        condition: {
          id: { $r: 'doctor_patient.patient_id' },
          is_deleted: false
        }
      }
    })

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}


export default { removePatient, createPatient, getAllByDoctor };