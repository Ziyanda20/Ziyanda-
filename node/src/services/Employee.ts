import Hospital from "../models/Hospital";
import Employee from "../models/Employee";

import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";

import { IAny, IResponse } from "../interfaces";
import { removePassword, saveSession } from "./User";

async function createAdmin(body: any): Promise<IResponse> {
  try {
    const { fullname, email, password, passwordAgain, name } = body;

    v.validate({
      'Full name': { value: fullname, min: 5, max: 30 },
      'Email address': { value: email, min: 5, max: 50 },
      'Password': { value: password, min: 8, max: 30 },
      'Password again': { value: passwordAgain, min: 8, max: 30, is: ['Password', 'Passwords do not match'] },
    });

    if ((await Employee.findOne({ condition: { email } }))) throw 'Doctor with same email address exists';

    const hospital = await Hospital.insert({
      name
    })

    const newUser = await Employee.insert({
      full_name: fullname,
      hospital_id: hospital.id,
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

async function createDoctor(body: any, admin: any): Promise<IResponse> {
  try {
    const { name, email } = body;

    v.validate({
      'Full name': { value: name, min: 5, max: 30 },
      'Email address': { value: email, min: 5, max: 50 }
    });

    if ((await Employee.findOne({ condition: { email } }))) throw 'Doctor with same email address exists';

    const newUser = await Employee.insert({
      full_name: name,
      email: email,
      role: 'doctor',
      hospital_id: admin.hospital_id,
      password: await hasher.hash('Password123'),
    });

    saveSession.call(this, removePassword(newUser.toObject()));

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function authEmployee(body: any): Promise<IResponse> {
  try {
    v.validate({
      'email address': { value: body.email, min: 5, max: 50 },
      'password': { value: body.password, min: 8, max: 30 },
    });

    const employee = await Employee.findOne({
      condition: { email: body.email }
    })

    if (!employee)
      throw "Email address is incorrect";

    if (!(await hasher.isSame(employee.password, body.password)))
      throw "Password is incorrect";

    saveSession.call(this, removePassword(employee.toObject()));

    this.route = employee.role == 'doctor' ? '/doctor/prescriptions' : '/hospital/doctors'

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getDoctors (body: any, admin: any) : Promise<IResponse> {
  this.doctors = await Employee.find({ condition: { hospital_id: admin.hospital_id, role: 'doctor' } })
  return this;
}

async function searchDoctors (body: any, admin: any) : Promise<IResponse> {
  this.doctors = await Employee.search({ condition: { hospital_id: admin.hospital_id, full_name: body.query, role: 'doctor' } })
  return this;
}


export default { createAdmin, createDoctor, authEmployee, getDoctors, searchDoctors };
