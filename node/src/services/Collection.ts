import Collection from "../models/Collection";

import { IAny, IResponse } from "../interfaces";

async function getByDoctor(body: any, doctor: any): Promise<IResponse> {
  try {
    const collections = await Collection.find({
      condition: { doctor_id: doctor.id },
      join: [
        {
          ref: "diagnosis",
          id: "diagnosis_id",
        },
        {
          ref: "patient",
          id: "patient_id",
        },
      ],
    });

    this.collections = collections;

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getByPatient(body: any, patient: any): Promise<IResponse> {
  try {
    const collections = await Collection.find({
      condition: { patient_id: patient.id },
      join: [
        {
          ref: "diagnosis",
          id: "diagnosis_id",
        },
        {
          ref: "doctor",
          id: "doctor_id",
        },
      ],
    });

    this.collections = collections;

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

export default { getByDoctor, getByPatient };
