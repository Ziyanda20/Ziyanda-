import { useEffect, useState } from "react";
import { downloadCSV, postWithAuth } from "../helpers/http";
import PatientMain from "./Main"

export async function getDeliveries() {
  const res = await postWithAuth('/deliveries/get/by/patient', {});

  return res.deliveries;
}

export default function _ () {
  const [deliveries, setDeliveries] = useState([]);

  const allowed = [
    'full_name', '_pharmacy_name','name', 'status'
  ]

  const header = [
    '#', 'Delivery person', 'Delivery from', 'Diagnosis', 'Status'
  ]

  useEffect(() => {
    (async () => {
      setDeliveries(await getDeliveries())
    })();
  }, [])

  return (
    <PatientMain page="deliveries">
      <div className="container__main__title">
        <h4><i className="fa-solid fa-truck-fast margin--right-1"></i><span>Deliveries</span></h4>
        <p>Keep track of your deliveries from here</p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <button onClick={() => downloadCSV('Patient Deliveries', deliveries, header, allowed)} className="btn btn--primary">Download CSV Report</button>

        <table className="table margin--top-2">
          <thead>
            <tr>
              <th>Delivery person</th>
              <th>Delivery from</th>
              <th>Diagnosis</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              deliveries?.map((delivery: any) => (
                <tr key={delivery.id}>
                  <td>{delivery.full_name || 'Driver unavailable'}</td>
                  <td>{delivery._pharmacy_name || 'Pharmacy unavailable'}</td>
                  <td>{delivery.name}</td>
                  <td>{delivery.status}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <a id="download-link" download></a>

      </div>
    </PatientMain>
  )
}