import Medicine from "../models/Medicine";

import v from "../helpers/Validation";

import { IAny, IResponse } from "../interfaces";

export const dosages = {
  '1 Teaspoon': 1,
  '2 Teaspoons': 2,
  '3 Teaspoons': 3,
  '4 Teaspoons': 4,
  '1 Pill': 1,
  '2 Pills': 2,
  '3 Pills': 3,
  '4 Pills': 4
}

export const frequencies = {
  'Once a day': 1,
  'Twice a day': 2,
  'Three times a day': 3
}

export const getMeasure = (dosage: string) => ((dosage.split(' ').includes('Teaspoon') || dosage.split(' ').includes('Teaspoons')) ? 'Teaspoons' : 'Pills')

export const getDosageLeft = (dosage: string, frequency: string, days: number) => {
  return days * dosages[dosage] * frequencies[frequency]
}

export const getReduceValue = (dosage: string, frequency: string) => {
  return dosages[dosage] * frequencies[frequency]
}

async function getAllByPrescription(body: any, doctor: any): Promise<IResponse> {
  try {
    const medicines = await Medicine.find({
      condition: { prescription_id: body.prescription_id }
    })

    this.medicines = medicines;

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getOneById(body: any): Promise<IResponse> {
  try {
    const medicine = await Medicine.findOne({
      condition: { id: body.id }
    })

    this.medicine = medicine.toObject();

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

export default { getAllByPrescription, getOneById };
