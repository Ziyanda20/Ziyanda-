import { useEffect, useState } from "react";
import Prescription from "../Components/Modal/Prescription"
import { getValueById } from "../helpers/dom";
import { postWithAuth } from "../helpers/http";
import { closeModal, openModal } from "../helpers/modals";
import DoctorMain from "./Main"
import { formatTime } from "../helpers/date";
import { Link } from "react-router-dom";
import { showError } from "../helpers/error";

export async function getPrescriptions() {
  const res = await postWithAuth('/prescriptions/get/by/doctor', {});

  return res.prescriptions;
}

export default function DoctorPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    (async () => {
      setPrescriptions(await getPrescriptions())
    })();
  }, [])

  async function submitPrescription(e: any, medicines: any, itemsCount: number) {
    e.preventDefault();

    const res = await postWithAuth('/prescriptions/add', {
      diagnosis_id: getValueById('prescription-diagnosis'),
      medicine_count: itemsCount,
      ...medicines
    })

    if (res.successful) {
      closeModal('new-prescription')

      setPrescriptions(await getPrescriptions())

      return;
    };

    showError('prescription', res.error)
  }

  async function removePrescription(prescription_id: string) {
    await postWithAuth('/prescriptions/remove/one', {
      prescription_id
    })

    setPrescriptions(await getPrescriptions())
  }

  async function makeReady(prescriptionId: string) {
    await postWithAuth('/prescriptions/make-ready', {
      prescriptionId
    })

    setPrescriptions(await getPrescriptions())
  }

  return (
    <DoctorMain page="prescriptions">
      <div className="container__main__title">
        <h4><i className="fa-regular fa-paste margin--right-1"></i><span>Prescriptions</span></h4>
        <p>Manage your patients' prescriptions from here</p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Patient name</th>
              <th>Delivery address</th>
              <th>Diagnosis</th>
              <th>Medicines</th>
              <th>Prescribed on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              prescriptions?.map((prescription: any) => (
                <tr key={prescription.id}>
                  <td>{prescription.full_name}</td>
                  <td>{!prescription.address_id ? (<span>No address</span>) : <span>{prescription.line_1}, {prescription.line_2}, {prescription.province}</span>}</td>
                  <td>{prescription.name}</td>
                  <td className="hover"><Link to={`/doctor/prescriptions/medicines?p=${prescription.id}`}>View</Link></td>
                  <td>{formatTime(new Date(prescription.date_created))}</td>
                  <td>
                    <span className="hover-del" onClick={() => removePrescription(prescription.id)}>Remove</span>
                    <span style={{ display: 'inline-block', margin: '0 1rem' }}>|</span>
                    {
                      !prescription.is_ready ?
                        (<span className="hover" onClick={() => makeReady(prescription.id)}>Dispatch delivery</span>) :
                        (<span>{prescription.status}</span>)
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <p className="margin--top-2 hover" onClick={() => openModal('new-prescription')}>
          <i className="fa-solid fa-plus margin--right-1"></i>
          <span>Add Prescription</span>
        </p>
      </div>

      <Prescription submitPrescription={submitPrescription}/>
    </DoctorMain>
  )
}