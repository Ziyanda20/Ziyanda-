import Patient from "../models/Patient";

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

    const newUser = await Patient.insert({
      name: name,
      id_number: id,
      password: await hasher.hash('Password123'),
    });

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}


export default { createPatient };
