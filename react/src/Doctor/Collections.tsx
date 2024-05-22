import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import DoctorMain from "./Main"

export async function getCollections() {
  const res = await postWithAuth('/collections/get/by/doctor', {});

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
    <DoctorMain page="collections">
      <div className="container__main__title">
        <h4><i className="fa-solid fa-truck-fast margin--right-1"></i><span>Collections</span></h4>
        <p>See your patients' collections from here</p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Patient</th>
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
    </DoctorMain>
  )
}