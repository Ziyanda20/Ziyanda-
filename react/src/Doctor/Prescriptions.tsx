import { useEffect, useState } from "react";
import Prescription from "../Components/Modal/Prescription"
import { getValueById } from "../helpers/dom";
import { postWithAuth } from "../helpers/http";
import { closeModal, openModal } from "../helpers/modals";
import DoctorMain from "./Main"
import { formatTime } from "../helpers/date";
import { Link } from "react-router-dom";
import { showError } from "../helpers/error";
import Pharmacies from "../Components/Modal/Pharmacies";

export async function getPrescriptions() {
  const res = await postWithAuth('/prescriptions/get/by/doctor', {});

  return res.prescriptions;
}

export async function getPharmacies() {
  const res = await postWithAuth('/pharmacies/get/all', {});

  return res.pharmacies;
}

export default function DoctorPrescriptions() {
  const [prescriptionId, setPrescriptionId] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    (async () => {
      setPrescriptions(await getPrescriptions())
      setPharmacies(await getPharmacies())
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

  async function assignPharmacy(pharmacy_id: string) {
    const res = await postWithAuth('/prescriptions/assign-pharmacy', {
      pharmacy_id,
      prescription_id: prescriptionId
    });

    setPrescriptions(await getPrescriptions())

    closeModal('select-pharmacy')
  }

  function _openModal(prescription_id: string) {
    setPrescriptionId(prescription_id);

    openModal('select-pharmacy')
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
              <th>Pharmacy</th>
              <th>Diagnosis</th>
              <th>Medicines</th>
              <th>Prescribed on</th>
            </tr>
          </thead>
          <tbody>
            {
              prescriptions?.map((prescription: any) => (
                <tr key={prescription.id}>
                  <td>{prescription.full_name}</td>
                  <td>
                    {!prescription.pharmacy_id ?
                      (
                        <span className="hover" onClick={() => _openModal(prescription.id)}>Not assigned</span>
                      ) :
                      <span>{prescription.name}</span>
                    }
                  </td>
                  <td>{prescription._diagnosis_name}</td>
                  <td className="hover"><Link to={`/doctor/prescriptions/medicines?p=${prescription.id}`}>View</Link></td>
                  <td>{formatTime(new Date(prescription.date_created))}</td>
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
      <Pharmacies assignPharmacy={assignPharmacy} pharmacies={pharmacies} />

    </DoctorMain>
  )
}