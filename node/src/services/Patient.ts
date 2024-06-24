import Patient from "../models/Patient";
import Admission from "../models/Admission";
import Prescription from "../models/Prescription";

import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";
import { getDayDifference } from "../helpers/Datetime";

import { removePassword, saveSession } from "./User";

import { IAny, IResponse } from "../interfaces";

async function createPatient(body: any, admin): Promise<IResponse> {
  try {
    const { name, id, email } = body;

    v.validate({
      'Full name': { value: name, min: 5, max: 50 },
      'Email address': { value: email, min: 5, max: 50 },
      'ID': { value: id },
    });

    if (id.length != 13) throw 'ID Number must be 13 characters long';
    if (!(/^-?\d+$/.test(id))) throw 'ID Number must be all numbers'

    let patient = await Patient.findOne({ condition: { id_number: id } });

    if (patient) {
      let admission = await Admission.getLastByPatient(patient.id);

      if (admission && getDayDifference(admission.date_created) < 30) {
        throw 'Patient was recently added';
      }

      let prescription = await Prescription.getLastByPatient(patient.id);

      if (prescription && getDayDifference(prescription.date_created) < 30) {
        throw 'Patient was recently prescribed medicine';
      }
    }

    patient = patient ? patient : await Patient.insert({
      full_name: name,
      email,
      id_number: id,
      password: await hasher.hash('Password123'),
    });

    if (!(await Admission.exists({ hospital_id: admin.hospital_id, patient_id: patient.id })).found)
      await Admission.insert({
        hospital_id: admin.hospital_id,
        patient_id: patient.id,
      })

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function removePatient(body: any, admin): Promise<IResponse> {
  try {
    const { name, patient_id } = body;

    await Patient.removeOne(patient_id);

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getAllByHospital(body: any, admin): Promise<IResponse> {
  try {
    this.patients = await Admission.find({
      condition: { hospital_id: admin.hospital_id },
      join: {
        ref: 'patient',
        condition: {
          id: { $r: 'admission.patient_id' },
          is_deleted: false
        }
      }
    })

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function searchAllByHospital(body: any, admin: any): Promise<IResponse>{
  try {
    this.patients = await Patient.raw(`
      SELECT * FROM patient
      INNER JOIN admission ON admission.patient_id = patient.id AND admission.hospital_id = 1 AND admission.is_deleted = 0
      WHERE patient.full_name LIKE '%${body.query}%'
    `)

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function authPatient(body: any): Promise<IResponse> {
  try {
    v.validate({
      'ID Number': { value: body.idNumber },
      'password': { value: body.password, min: 8, max: 30 },
    });

    if (body.idNumber.length != 13) throw 'ID Number must be 13 characters long';
    if (!(/^-?\d+$/.test(body.idNumber))) throw 'ID Number must be all numbers'

    const patient = await Patient.findOne({
      condition: { id_number: body.idNumber }
    })

    if (!patient)
      throw "ID Number is incorrect";

    if (!(await hasher.isSame(patient.password, body.password)))
      throw "Password is incorrect";

    saveSession.call(this, removePassword(patient.toObject()));

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function updateProfile(body: any, user: any) : Promise<IResponse>{
  let _user = await Patient.findOne({
    condition: { id: user.id }
  })

  _user.full_name = body.full_name;

  _user.save();

  let res =  {..._user.toObject(), id: _user.id, full_name: body.full_name }; 
  this.user = res;
  
  saveSession.call(this, removePassword(res));
  
  this.successful = true;

  return this;
}

async function updatePassword(body: any, user: any) : Promise<IResponse>{
  v.validate({
    'Password old': { value: body.password_old, min: 8, max: 30 },
    'Password': { value: body.password, min: 8, max: 30 },
    'Password again': { value: body.password_again, min: 8, max: 30, is: ['Password', 'Passwords do not match'] },
  });

  let _user = await Patient.findOne({
    condition: { id: user.id }
  })

  if (!(await hasher.isSame(_user.password, body.password_old)))
    throw 'Password do not match';

  _user.password = await hasher.hash(body.password);

  _user.save();

  let res = _user.toObject(); 
  this.user = res;
  
  this.successful = true;
  
  saveSession.call(this, removePassword(res));

  return this;
}

async function updateAddress (body: any, user: any) : Promise<IResponse>{
  let _user = await Patient.findOne({
    condition: { id: user.id }
  })

  _user.addr_line_1 = body.line_1;
  _user.addr_line_2 = body.line_2;
  _user.province = body.province;

  _user.save();

  let res =  {..._user.toObject(), id: _user.id, addr_line_1: body.line_1, addr_line_2: body.line_2, province: body.province }; 
  this.user = res;

  this.successful = true;
  
  saveSession.call(this, removePassword(res));

  return this;
}

export default { updateAddress, updatePassword, updateProfile, authPatient, removePatient, createPatient, searchAllByHospital, getAllByHospital };
