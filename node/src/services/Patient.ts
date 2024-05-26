import Patient from "../models/Patient";
import DoctorPatient from "../models/DoctorPatient";
import Prescription from "../models/Prescription";

import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";
import { getDayDifference } from "../helpers/Datetime";

import { removePassword, saveSession } from "./User";

import { IAny, IResponse } from "../interfaces";

async function createPatient(body: any, doctor): Promise<IResponse> {
  try {
    const { name, id } = body;

    v.validate({
      'Full name': { value: name, min: 5, max: 50 },
      'ID': { value: id },
    });

    if (id.length != 13) throw 'ID Number must be 13 characters long';
    if (!(/^-?\d+$/.test(id))) throw 'ID Number must be all numbers'

    let patient = await Patient.findOne({ condition: { id_number: id } });

    if (patient) {
      let doctorPatientRel = await DoctorPatient.getLastByPatient(patient.id);

      if (doctorPatientRel && getDayDifference(doctorPatientRel.date_created) < 30) {
        throw 'Patient was recently added';
      }

      let prescription = await Prescription.getLastByPatient(patient.id);

      if (prescription && getDayDifference(prescription.date_created) < 30) {
        throw 'Patient was recently prescribed medicine';
      }
    }

    patient = patient ? patient : await Patient.insert({
      full_name: name,
      id_number: id,
      password: await hasher.hash('Password123'),
    });

    if (!(await DoctorPatient.exists({ doctor_id: doctor.id, patient_id: patient.id })).found)
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


async function authPatient(body: any): Promise<IResponse> {
  try {
    v.validate({
      'ID Number': { value: body.idNumber },
      'password': { value: body.password, min: 8, max: 30 },
    });

    if (body.idNumber.length != 13) throw 'ID Number must be 13 characters long';
    if (!(/^-?\d+$/.test(body.idNumber))) throw 'ID Number must be all numbers'

    const patient = await Patient.findOne({
      condition: { id_number: body.idNumber }
    })

    if (!patient)
      throw "ID Number is incorrect";

    if (!(await hasher.isSame(patient.password, body.password)))
      throw "Password is incorrect";

    saveSession.call(this, removePassword(patient.toObject()));

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

export default { authPatient, removePatient, createPatient, getAllByDoctor };
