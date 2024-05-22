import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import PatientMain from "./Main"
import { formatTime } from "../helpers/date";
import { Link } from "react-router-dom";

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

  async function switchCollection(collection_type: string, prescription_id: string) {
    await postWithAuth('/prescription/switch/collection', {
      collection_type,
      prescription_id
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
              <th>Diagnosis</th>
              <th>Medicines</th>
              <th>Prescribed on</th>
              <th>Collection type</th>
            </tr>
          </thead>
          <tbody>
            {
              prescriptions?.map((prescription: any) => (
                <tr key={prescription.id}>
                  <td>{prescription.full_name}</td>
                  <td>{prescription.name}</td>
                  <td><Link to={`/patient/prescriptions/medicines?p=${prescription.id}`}>View</Link></td>
                  <td>{formatTime(new Date(prescription.date_created))}</td>
                  <td>
                    {
                      prescription.collection_type == 'delivery' ?
                        ( <span onClick={() => switchCollection('collection', prescription.id)}>Switch to collection</span> ) :
                        (<span onClick={() => switchCollection('delivery', prescription.id)}>Switch to delivery</span>)
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </PatientMain>
  )
}