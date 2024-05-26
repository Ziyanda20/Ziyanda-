import Prescription from "../models/Prescription";
import Diagnoses from "../models/Diagnosis";
import Medicine from "../models/Medicine";
import DosageTracker from "../models/DosageTracker";
import Collection from "../models/Collection";
import CollectionLines from "../models/CollectionLine";
import { getDayDifference } from "../helpers/Datetime";

import v from "../helpers/Validation";

import { IAny, IResponse } from "../interfaces";
import { getDosageLeft, getMeasure, getReduceValue } from "./Medicine";


async function createPrescription(body: any, doctor: any): Promise<IResponse> {
  try {
    const { name, diagnosis_id, medicine_count } = body;

    if (diagnosis_id == 'select') throw "Please select diagnosis";

    const diagnosis = await Diagnoses.findOne({
      condition: {
        id: diagnosis_id,
      },
    });

    if (!diagnosis) throw "Could not find diagnosis";

    for (let index = 0; index < medicine_count; index++) {
      let name = body[`name_${index}`];
      let _dosage = body[`_dosage_${index}`];
      let frequency = body[`frequency_${index}`];
      let days = body[`days_${index}`];

      const _v = {
      }

      _v[`Medicine ${index + 1}`] = { value: name, min: 3, max: 30 }
      _v[`Days ${index + 1}`] = { value: days, min: 1, max: 3 }

      if (!(/^-?\d+$/.test(days))) throw `Days ${index + 1} must be all numbers under 31`
      else if (parseInt(days) > 30) throw `Days ${index + 1} must be under 31`
      else if (_dosage == 'select') throw 'Please select dosage'
      else if (frequency == 'select') throw 'Please select frequency'

      v.validate(_v);
    }

    let lastPrescription = await Prescription.getLastByPatient(diagnosis.patient_id);

    if (lastPrescription && getDayDifference(lastPrescription.date_created) < 30) {
      throw 'Patient was recently prescribed medicine';
    }

    const prescription = await Prescription.insert({
      diagnosis_id,
      patient_id: diagnosis.patient_id,
      doctor_id: doctor.id,
    });

    for (let index = 0; index < medicine_count; index++) {
      let name = body[`name_${index}`];
      let dosage = body[`dosage_${index}`];
      let frequency = body[`frequency_${index}`];
      let days = body[`days_${index}`];

      const med = await Medicine.insert({
        prescription_id: prescription.id,
        name,
        dosage,
        dosage_left: `${getDosageLeft(dosage, frequency, days)} ${getMeasure(dosage)}`,
        frequency,
        days,
      });

      const today = new Date();
      let varDate = new Date(`${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()} 23:59`);

      for (let day = 0; day < parseInt(days); day++) {
        varDate.setDate(varDate.getDate() + 1);

        await DosageTracker.insert({
          prescription_id: prescription.id,
          medicine_id: med.id,
          take_by: varDate
        });
      }
    }

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function removePrescription(body: any, doctor: any): Promise<IResponse> {
  try {
    const { prescription_id } = body;

    await Prescription.removeOne(prescription_id);

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getAllByDoctor(body: any, doctor): Promise<IResponse> {
  try {
    this.prescriptions = await Prescription.find({
      condition: { doctor_id: doctor.id, is_deleted: false },
      join: [
        {
          ref: "patient",
          id: "patient_id",
        },
        {
          ref: "diagnosis",
          id: "diagnosis_id",
        },
      ],
    });

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getAllByPatient(body: any, patient): Promise<IResponse> {
  try {
    this.prescriptions = await Prescription.find({
      condition: { patient_id: patient.id, is_deleted: false },
      join: [
        {
          ref: "doctor",
          id: "doctor_id",
        },
        {
          ref: "diagnosis",
          id: "diagnosis_id",
        },
      ],
    });

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getOneById(body: any, doctor): Promise<IResponse> {
  try {
    const prescription = await Prescription.findOne({
      condition: { id: body.prescription_id, is_deleted: false },
      join: [
        {
          ref: "patient",
          id: "patient_id",
        },
        {
          ref: "diagnosis",
          id: "diagnosis_id",
        },
      ],
    });

    this.prescription = prescription ? prescription.toObject() : null;

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function getTrackerItems(body: any): Promise<IResponse> {
  try {
    const { medicine_id, prescription_id } = body;

    this.trackers = await DosageTracker.find({
      condition: { medicine_id, prescription_id },
      join: [
        {
          ref: "medicine",
          id: "medicine_id",
        },
      ],
    });

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function take(body: any): Promise<IResponse> {
  try {
    const tracker = await DosageTracker.findOne({ condition: { id: body.id } });

    tracker.is_taken = true;

    tracker.save();

    const medicine = await Medicine.findOne({ condition: { id: tracker.medicine_id } })

    let currentDosageLeft = parseFloat(medicine.dosage_left);

    let reduceBy = getReduceValue(medicine.dosage, medicine.frequency);

    medicine.dosage_left = `${currentDosageLeft - reduceBy} ${getMeasure(medicine.dosage)}`;

    medicine.save()

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function makeReady(body, doctor) {
  try {
    const { prescriptionId } = body;

    const prescription = await Prescription.findOne({
      condition: { id: prescriptionId },
    });

    if (prescription.is_ready) return this;

    prescription.is_ready = true;
    prescription.status = prescription.collection_type == 'delivery' ? 'Dispatched for delivery' : 'Ready for collection'

    const collection = await Collection.insert({
      doctor_id: doctor.id,
      diagnosis_id: prescription.diagnosis_id,
      patient_id: prescription.patient_id,
      status: prescription.status,
    });

    prescription.save();

    const medicine_lines = await Medicine.find({
      condition: { prescription_id: prescription.id },
    });

    for (let index = 0; index < medicine_lines.length; index++) {
      await CollectionLines.insert({
        collection_id: collection.id,
        Medicine_id: medicine_lines[index].id,
      });
    }

    this.successful = true;
  } catch (error) {
    throw error;
  }
  return this;
}

async function switchCollection (body) {
  try {
    const {prescription_id, collection_type} = body;

    const prescription = await Prescription.findOne({
      condition: { id: prescription_id },
    });

    prescription.collection_type = collection_type;

    prescription.save();

  } catch (e) { throw e; }

  return this;
}

export default {
  switchCollection,
  makeReady,
  getTrackerItems,
  take,
  removePrescription,
  createPrescription,
  getAllByPatient,
  getAllByDoctor,
  getOneById,
};
