import Pharmacy from "../models/Pharmacy";
import Pharmacist from "../models/Pharmacist";

import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";

import { IAny, IResponse } from "../interfaces";
import { removePassword, saveSession } from "./User";

async function createPharmacist(body: any): Promise<IResponse> {
  try {
    const { fullname, email, password, passwordAgain, name } = body;

    v.validate({
      'Pharmacy name': { value: name, min: 5, max: 30 },
      'Full name': { value: fullname, min: 5, max: 30 },
      'Email address': { value: email, min: 5, max: 50 },
      'Password': { value: password, min: 8, max: 30 },
      'Password again': { value: passwordAgain, min: 8, max: 30, is: ['Password', 'Passwords do not match'] },
    });

    if ((await Pharmacist.findOne({ condition: { email } }))) throw 'Pharmacist with same email address exists';

    const pharmacy = await Pharmacy.insert({
      name
    })

    const newUser = await Pharmacist.insert({
      full_name: fullname,
      pharmacy_id: pharmacy.id,
      email: email,
      password: await hasher.hash(password)
    });

    saveSession.call(this, removePassword(newUser.toObject()));

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function authPharmacist(body: any): Promise<IResponse> {
  try {
    v.validate({
      'email address': { value: body.email, min: 5, max: 50 },
      'password': { value: body.password, min: 8, max: 30 },
    });

    const pharmacist = await Pharmacist.findOne({
      condition: { email: body.email }
    })

    if (!pharmacist)
      throw "Email address is incorrect";

    if (!(await hasher.isSame(pharmacist.password, body.password)))
      throw "Password is incorrect";

    saveSession.call(this, removePassword(pharmacist.toObject()));

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getPharmacies(body: any): Promise<IResponse> {
  try {
    const pharmacies = await Pharmacy.find({});

    this.pharmacies = pharmacies;

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}


export default { createPharmacist, authPharmacist, getPharmacies };
