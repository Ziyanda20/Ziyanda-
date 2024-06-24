import DoctorMain from "./Main"

import Patient from "../Components/Modal/Patient"

import "./Patients.css"
import { useEffect, useState } from "react"
import { downloadCSV, postWithAuth } from "../helpers/http";
import { closeModal, openModal } from "../helpers/modals";
import { getValueById } from "../helpers/dom";
import { formatTime } from "../helpers/date";
import { showError } from "../helpers/error";
import { Link } from "react-router-dom";

export async function getPatients() {
  const res = await postWithAuth('/patients/get/by/hospital', {});

  return res.patients;
}

export async function searchPatients(query: string) {
  const res = await postWithAuth('/patients/search/by/hospital', {
    query
  });

  return res.patients;
}

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);

  const allowed = [
    'full_name', 'id_number', 'email', 'date_created'
  ]

  const header = [
    '#', 'Full name', 'ID Number', 'Email address', 'Date added'
  ]

  useEffect(() => {
    (async () => {
      setPatients(await getPatients())
    })();
  }, [])

  async function _searchPatients () {
    setPatients(await searchPatients(getValueById('query')))
  }

  async function addPatient(e: any) {
    e.preventDefault();

    const res = await postWithAuth('/patients/add', {
      name: getValueById('patient-name'),
      id: getValueById('patient-id'),
      email: getValueById('patient-email')
    });

    if (res.successful) {
      setPatients(await getPatients())

      closeModal('new-patient');

      return;
    }

    showError('patient', res.error)
  }

  async function removePatient(patient_id: string) {
    await postWithAuth('/patients/remove/one', {
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
        <div className="flex flex--a-center flex--j-space-between">
          <div className="input">
            <input type="text" name="" id="query" onKeyUp={() => _searchPatients()} placeholder="Search patients" />
          </div>

          <button onClick={() => downloadCSV('Hospital Patients', patients, header, allowed)} className="btn btn--primary">Download CSV Report</button>
        </div>

        <table className="table margin--top-2">
          <thead>
            <tr>
              <th>Full name</th>
              <th>ID Number</th>
              <th>Email address</th>
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
                  <td>{patient.email}</td>
                  <td>{formatTime(new Date(patient.date_created))}</td>
                  <td>
                    <span className="hover-del" onClick={() => removePatient(patient.id)}>Remove</span>
                    {/* <span className="hover"><Link to={`/doctor/diagnoses?patient=${patient.id}`}>Diagnose</Link></span> */}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <a id="download-link" download></a>

        <p className="margin--top-2 hover" onClick={() => openModal('new-patient')}>
          <i className="fa-solid fa-plus margin--right-1"></i>
          <span>Add Patient</span>
        </p>
      </div>

      <Patient addPatient={addPatient}/>
    </DoctorMain>
  )
}