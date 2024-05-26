import Address from "../models/Address";

import { IAny, IResponse } from "../interfaces";

async function createOrUpdate(body: any, patient: any): Promise<IResponse> {
  try {
    const {line_1, line_2, province} = body;

    const address = await Address.findOne({
      condition: { patient_id: patient.id },
    });

    if (!address) {
      await Address.insert({
        patient_id: patient.id,
        line_1,
        line_2,
        province
      })
    }

    else {
      address.line_1 = line_1;
      address.line_2 = line_2;
      address.province = province;

      address.save();
    }

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}


export default { createOrUpdate };
