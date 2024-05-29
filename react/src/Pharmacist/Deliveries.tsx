import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import { formatTime } from "../helpers/date";
import { Link } from "react-router-dom";
import PharmacyMain from "./Main"

export async function getDeliveries() {
  const res = await postWithAuth('/deliveries/get/by/pharmacy', {});

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
    <PharmacyMain page="deliveries">
      <div className="container__main__title">
        <h4><i className="fa-regular fa-paste margin--right-1"></i><span>Deliveries</span></h4>
        <p>Patient deliveries</p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Patient name</th>
              <th>Delivery address</th>
              <th>Diagnosis</th>
              <th>Prescribed on</th>
            </tr>
          </thead>
          <tbody>
            {
              deliveries?.map((delivery: any) => (
                <tr key={delivery.id}>
                  <td>{delivery.full_name}</td>
                  <td>{!delivery.addr_line_1 ? (<span>No address</span>) : <span>{delivery.addr_line_1}, {delivery.addr_line_2}, {delivery.province}</span>}</td>
                  <td>{delivery.name}</td>
                  <td>{formatTime(new Date(delivery.date_created))}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </PharmacyMain>
  )
}