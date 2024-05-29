import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import { formatTime } from "../helpers/date";
import { Link } from "react-router-dom";
import PharmacyMain from "./Main"

export async function getPrescriptions() {
  const res = await postWithAuth('/prescriptions/get/by/pharmacy', {});

  return res.prescriptions;
}

export default function _ () {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    (async () => {
      setPrescriptions(await getPrescriptions())
    })();
  }, [])

  async function dispatch(prescriptionId: string) {
    await postWithAuth('/prescriptions/dispatch-delivery', {
      prescriptionId
    });

    setPrescriptions(await getPrescriptions())
  }

  return (
    <PharmacyMain page="prescriptions">
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
                  <td>{!prescription.addr_line_1 ? (<span>No address</span>) : <span>{prescription.addr_line_1}, {prescription.addr_line_2}, {prescription.province}</span>}</td>
                  <td>{prescription.name}</td>
                  <td className="hover"><Link to={`/pharmacy/prescriptions/medicines?p=${prescription.id}`}>View</Link></td>
                  <td>{formatTime(new Date(prescription.date_created))}</td>
                  <td>{!prescription.is_ready ? (<span onClick={() => dispatch(prescription.id)}>Dispatch delivery</span>) : 'Dispatched'}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </PharmacyMain>
  )
}