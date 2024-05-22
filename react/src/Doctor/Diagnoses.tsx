import { useEffect, useState } from "react";

import { getPatients } from "./Patients";
import { closeModal, openModal } from "../helpers/modals";
import { postWithAuth } from "../helpers/http";
import { getValueById } from "../helpers/dom";
import { formatTime } from "../helpers/date";
import DoctorMain from "./Main"
import Diagnoses from "../Components/Modal/Diagnoses";
import { showError } from "../helpers/error";

export default function DoctorDiagnoses() {
  const [patients, setPatients] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    (async () => {
      setPatients(await getPatients())
      setDiagnoses(await getDiagnoses())
    })()
  }, [])

  async function addDiagnoses (e: any) {
    e.preventDefault();

    const res = await postWithAuth('/diagnoses/add', {
      name: getValueById('diagnoses-name'),
      patient_id: getValueById('diagnoses-patient')
    })

    setDiagnoses(await getDiagnoses())


    if (res.successful) {
      closeModal('new-diagnoses')

      return;
    }

    showError('diagnosis', res.error);
  }

  async function removeDiagnoses(diagnoses_id: string) {
    await postWithAuth('/diagnoses/remove/one', {
      diagnoses_id
    })

    setDiagnoses(await getDiagnoses())
  }

  async function getDiagnoses() {
    const res = await postWithAuth('/diagnoses/get/by/doctor', { })

    return res.diagnoses;
  }

  return (
    <DoctorMain page="diagnoses">
      <div className="container__main__title">
        <h4><i className="fa-solid fa-stethoscope margin--right-1"></i><span>Diagnoses</span></h4>
        <p>Manage your patients' diagnoses from here</p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Diagnosis</th>
              <th>Diagnosed on</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {diagnoses?.map((item: any) => (
              <tr key={item.id}>
                <td>{item.full_name}</td>
                <td>{item.name}</td>
                <td>{formatTime(new Date(item.date_created))}</td>
                <td className="hover-del" onClick={() => removeDiagnoses(item.id)}>Remove</td>
              </tr>
            ))}
          </tbody>
          <tbody>

          </tbody>
        </table>

        <p className="margin--top-2 hover" onClick={() => openModal('new-diagnoses')}>
          <i className="fa-solid fa-plus margin--right-1"></i>
          <span>Add Diagnosis</span>
        </p>
      </div>

      <Diagnoses addDiagnoses={addDiagnoses} patients={patients} />
    </DoctorMain>
  )
}