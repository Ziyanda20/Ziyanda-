import DoctorMain from "./Main"
import Doctor from "../Components/Modal/Doctor"

import { useEffect, useState } from "react"
import { downloadCSV, postWithAuth } from "../helpers/http";
import { closeModal, openModal } from "../helpers/modals";
import { getValueById } from "../helpers/dom";
import { formatTime } from "../helpers/date";
import { showError } from "../helpers/error";

import "./Doctors.css"

export async function getDoctors() {
  const res = await postWithAuth('/employees/get/doctors/by/hospital', {});

  return res.doctors;
}

export async function searchDoctors() {
  const res = await postWithAuth('/employees/search/doctors/by/hospital', {
    query: getValueById('query')
  });

  return res.doctors;
}

export default function DoctorDoctors() {
  const [doctors, setDoctors] = useState([]) as any;

  const allowed = [
    'full_name', 'email', 'date_created'
  ]

  const header = [
    '#', 'Full name', 'Email address', 'Date added'
  ]

  useEffect(() => {
    (async () => {
      setDoctors(await getDoctors())
    })();
  }, [])

  async function _searchDoctors() {
    setDoctors(await searchDoctors())
  }

  async function addDoctor(e: any) {
    e.preventDefault();

    const res = await postWithAuth('/employee/register/doctor', {
      name: getValueById('doctor-name'),
      email: getValueById('doctor-email'),
    });

    if (res.successful) {
      setDoctors(await getDoctors())

      closeModal('new-doctor');

      return;
    }

    showError('doctor', res.error)
  }

  async function removeDoctor(doctor_id: string) {
    await postWithAuth('/emploees/remove/one', {
      doctor_id
    });

    setDoctors(await getDoctors())
  }

  return (
    <DoctorMain page="doctors">
      <div className="container__main__title">
        <h4><i className="fa-solid fa-people-group margin--right-1"></i><span>Doctors</span></h4>
        <p>Manage your doctors from here</p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <div className="flex flex--a-center flex--j-space-between">
          <div className="input">
            <input type="text" name="" id="query" onKeyUp={() => _searchDoctors()} placeholder="Search doctors" />
          </div>

          <button onClick={() => downloadCSV('Hospital Doctors', doctors, header, allowed)} className="btn btn--primary">Download CSV Report</button>
        </div>

        <table className="table margin--top-2">
          <thead>
            <tr>
              <th>Full name</th>
              <th>Email address</th>
              <th>Added on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              doctors?.map((doctor: any) => (
                <tr key={doctor.id}>
                  <td>{doctor.full_name}</td>
                  <td>{doctor.email}</td>
                  <td>{formatTime(new Date(doctor.date_created))}</td>
                  <td>
                    <span className="hover-del" onClick={() => removeDoctor(doctor.id)}>Remove</span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <a id="download-link" download></a>

        <p className="margin--top-2 hover" onClick={() => openModal('new-doctor')}>
          <i className="fa-solid fa-plus margin--right-1"></i>
          <span>Add Doctor</span>
        </p>
      </div>

      <Doctor addDoctor={addDoctor} />
    </DoctorMain>
  )
}