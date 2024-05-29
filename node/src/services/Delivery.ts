import Delivery from "../models/Delivery";

import { IAny, IResponse } from "../interfaces";

async function getByDoctor(body: any, doctor: any): Promise<IResponse> {
  try {
    const deliveries = await Delivery.find({
      condition: { hospital_id: doctor.hospital_id },
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

async function getByPharmacy(body: any, pharmacist: any): Promise<IResponse> {
  try {
    const deliveries = await Delivery.find({
      condition: { pharmacy_id: pharmacist.pharmacy_id },
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
          ref: "pharmacy",
          id: "pharmacy_id",
        },
        {
          kind: 'left',
          ref: "driver",
          id: "driver_id",
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

async function assignDriver (body: any, driver: any): Promise<IResponse> {
  try {
    const delivery = await Delivery.findOne({
      condition: { id: body.id }
    });

    if (!delivery.driver_id) {
      delivery.driver_id = driver.id;
      delivery.status = 'In transit';

      delivery.save()
    }

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}


async function finish (body: any, driver: any): Promise<IResponse> {
  try {
    const delivery = await Delivery.findOne({
      condition: { id: body.id }
    });

    if (delivery.driver_id == driver.id) {
      delivery.status = 'Delivered';

      delivery.save()
    }

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

export default { assignDriver, finish, getByPharmacy, getByDoctor, getByPatient };
