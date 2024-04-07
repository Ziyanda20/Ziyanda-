import DoctorMain from "./Main"

import Patient from "../Components/Modal/Patient"

import "./Patients.css"
import { useEffect, useState } from "react"
import { postWithAuth } from "../helpers/http";
import { closeModal, openModal } from "../helpers/modals";
import { getValueById } from "../helpers/dom";
import { formatTime } from "../helpers/date";

export async function getPatients() {
  const res = await postWithAuth('/patients/get/by/doctor', {});

  return res.patients;
}

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    (async () => {
      setPatients(await getPatients())
    })();
  }, [])

  async function addPatient(e: any) {
    e.preventDefault();

    const res = await postWithAuth('/patients/add', {
      name: getValueById('patient-name'),
      id: getValueById('patient-id'),
    });

    if (res.successful) {
      setPatients(await getPatients())

      closeModal('new-patient')
    }
  }

  async function removePatient(patient_id: string) {
    const res = await postWithAuth('/patients/remove/one', {
      patient_id
    });

    setPatients(await getPatients())
  }

  return (
    <DoctorMain page="patients">
      <div className="container__main__title">
        <h4><i className="fa-solid fa-people-group margin--right-1"></i><span>Patients</span></h4>
        <p>Manage your patients from here</p>
      </div>

      <div className="container__main__pad" style={{marginTop: '4rem'}}>
        <table className="table">
          <thead>
            <tr>
              <th>Full name</th>
              <th>ID Number</th>
              <th>Added on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              patients?.map((patient: any) => (
                <tr key={patient.id}>
                  <td>{patient.full_name}</td>
                  <td>{patient.id_number}</td>
                  <td>{formatTime(new Date(patient.date_created))}</td>
                  <td className="hover-del" onClick={() => removePatient(patient.id)}>Remove</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <p className="margin--top-2 hover" onClick={() => openModal('new-patient')}>
          <i className="fa-solid fa-plus margin--right-1"></i>
          <span>Add Patient</span>
        </p>
      </div>

      <Patient addPatient={addPatient}/>
    </DoctorMain>
  )
}