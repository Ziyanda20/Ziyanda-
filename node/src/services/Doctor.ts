import Doctor from "../models/Doctor";

import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";

import { IAny, IResponse } from "../interfaces";
import { removePassword, saveSession } from "./User";

async function createDoctor(body: any): Promise<IResponse> {
  try {
    const { fullname, email, password } = body;

    v.validate({
      'Full name': { value: fullname, min: 5, max: 30 },
      'email address': { value: email, min: 5, max: 50 },
      'password': { value: password, min: 8, max: 30 },
    });

    const newUser = await Doctor.insert({
      full_name: fullname,
      email: email,
      password: await hasher.hash(password),
    });

    saveSession.call(this, removePassword(newUser.toObject()));

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function authDoctor(body: any): Promise<IResponse> {
  try {
    const doctor = await Doctor.findOne({
      condition: { email: body.email }
    })

    if (!doctor)
      throw "Email address is incorrect";

    if (!(await hasher.isSame(doctor.password, body.password)))
      throw "Password is incorrect";

    saveSession.call(this, removePassword(doctor.toObject()));

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

export default { createDoctor, authDoctor };
