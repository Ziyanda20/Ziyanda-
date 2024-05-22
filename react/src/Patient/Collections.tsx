import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import PatientMain from "./Main"

export async function getCollections() {
  const res = await postWithAuth('/collections/get/by/patient', {});

  return res.collections;
}

export default function _ () {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    (async () => {
      setCollections(await getCollections())
    })();
  }, [])

  return (
    <PatientMain page="deliveries-collections">
      <div className="container__main__title">
        <h4><i className="fa-solid fa-truck-fast margin--right-1"></i><span>Deliveries &amp; Collections</span></h4>
        <p>Keep track of your collections from here</p>
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
              collections?.map((collection: any) => (
                <tr key={collection.id}>
                  <td>{collection.full_name}</td>
                  <td>{collection.name}</td>
                  <td>{collection.status}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </PatientMain>
  )
}