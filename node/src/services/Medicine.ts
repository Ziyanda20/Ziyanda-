import Medicine from "../models/Medicine";

import v from "../helpers/Validation";

import { IAny, IResponse } from "../interfaces";

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

export default { getAllByPrescription };
