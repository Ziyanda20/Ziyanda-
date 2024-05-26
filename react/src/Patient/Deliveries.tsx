import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import PatientMain from "./Main"

export async function getDeliveries() {
  const res = await postWithAuth('/deliveries/get/by/patient', {});

  return res.deliveries;
}

export default function _ () {
  const [deliveries, setDeliveries] = useState([]);

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
        <table className="table">
          <thead>
            <tr>
              <th>Prescribing doctor</th>
              <th>Diagnosis</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              deliveries?.map((delivery: any) => (
                <tr key={delivery.id}>
                  <td>{delivery.full_name}</td>
                  <td>{delivery.name}</td>
                  <td>{delivery.status}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </PatientMain>
  )
}