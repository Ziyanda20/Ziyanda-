import Delivery from "../models/Delivery";

import { IAny, IResponse } from "../interfaces";

async function getByDoctor(body: any, doctor: any): Promise<IResponse> {
  try {
    const deliveries = await Delivery.find({
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

    this.deliveries = deliveries;

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getByPatient(body: any, patient: any): Promise<IResponse> {
  try {
    const deliveries = await Delivery.find({
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

    this.deliveries = deliveries;

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

export default { getByDoctor, getByPatient };
