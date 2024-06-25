import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import DriverMain from "./Main"

export async function getDeliveries() {
  const res = await postWithAuth('/deliveries/get/by/pharmacy', {});

  return res.deliveries;
}

export default function _() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    (async () => {
      setDeliveries(await getDeliveries())
    })();
  }, [])

  async function assignDriver(id: string) {
    await postWithAuth('/delivery/assign-driver', {
      id
    });

    setDeliveries(await getDeliveries())
  }

  async function finish(id: string) {
    await postWithAuth('/delivery/finish', {id});

    setDeliveries(await getDeliveries())
  }

  return (
    <DriverMain page="deliveries">
      <div className="container__main__title">
        <h4><i className="fa-solid fa-truck-fast margin--right-1"></i><span>Deliveries</span></h4>
        <p>Deliveries from your pharamacy</p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Patient name</th>
              <th>Delivery address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              deliveries?.map((delivery: any) => (
                <tr key={delivery.id}>
                  <td>{delivery.full_name}</td>
                  <td>{!delivery.addr_line_1 ? (<span>No address</span>) : <span>{delivery.addr_line_1}, {delivery.addr_line_2}, {delivery.province}</span>}</td>
                  <td>
                    {
                      delivery.status == 'Dispatched; Waiting on driver' ?
                        (<span className="hover" onClick={() => assignDriver(delivery.id)}>Deliver medicine</span>) :
                        delivery.status == 'In transit' ? 
                          (<span className="hover" onClick={() => finish(delivery.id)}>Finish delivery</span>) : 
                          delivery.status
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </DriverMain>
  )
}