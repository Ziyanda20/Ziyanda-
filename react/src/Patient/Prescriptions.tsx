import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import { formatTime } from "../helpers/date";
import { Link } from "react-router-dom";
import PatientMain from "./Main"

export async function getPrescriptions() {
  const res = await postWithAuth('/prescriptions/get/by/patient', {});

  return res.prescriptions;
}


export default function DoctorPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    (async () => {
      setPrescriptions(await getPrescriptions())
    })();
  }, [])

  async function setAddress(prescriptionId: string) {
    await postWithAuth('/prescription/add/delivery-address', {
      prescriptionId
    });

    setPrescriptions(await getPrescriptions())
  }

  return (
    <PatientMain page="prescriptions">
      <div className="container__main__title">
        <h4><i className="fa-regular fa-paste margin--right-1"></i><span>Prescriptions</span></h4>
        <p>Keep track of your prescriptions from here</p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Doctor name</th>
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
                  <td >
                    { !prescription.pharmacy_id ? 
                      (
                        <span>Not assigned</span>
                      ) : 
                      <span>{prescription.name}</span>
                    }
                  </td>
                  <td>{prescription._diagnosis_name}</td>
                  <td className="hover"><Link to={`/patient/prescriptions/medicines?p=${prescription.id}`}>View</Link></td>
                  <td>{formatTime(new Date(prescription.date_created))}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </PatientMain>
  )
}