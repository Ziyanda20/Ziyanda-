import Driver from "../models/Driver";

import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";

import { IAny, IResponse } from "../interfaces";
import { removePassword, saveSession } from "./User";

async function createDriver(body: any, pharmacist: any): Promise<IResponse> {
  try {
    const { name, email } = body;

    v.validate({
      'Full name': { value: name, min: 5, max: 30 },
      'Email address': { value: email, min: 5, max: 50 }
    });

    if ((await Driver.findOne({ condition: { email } }))) throw 'Driver with same email address exists';

    const newUser = await Driver.insert({
      full_name: name,
      email: email,
      pharmacy_id: pharmacist.pharmacy_id,
      password: await hasher.hash('Password123'),
    });

    saveSession.call(this, removePassword(newUser.toObject()));

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function authDriver(body: any): Promise<IResponse> {
  try {
    v.validate({
      'email address': { value: body.email, min: 5, max: 50 },
      'password': { value: body.password, min: 8, max: 30 },
    });

    const driver = await Driver.findOne({
      condition: { email: body.email }
    })

    if (!driver)
      throw "Email address is incorrect";

    if (!(await hasher.isSame(driver.password, body.password)))
      throw "Password is incorrect";

    saveSession.call(this, removePassword(driver.toObject()));

    this.route = driver.role == 'driver' ? '/driver/prescriptions' : '/hospital/drivers'

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getDrivers (body: any, pharmacist: any) : Promise<IResponse> {
  this.drivers = await Driver.find({ condition: { pharmacy_id: pharmacist.pharmacy_id } })
  return this;
}

export default { createDriver, authDriver, getDrivers };
