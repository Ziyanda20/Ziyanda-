import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import PatientMain from "./Main"
import { getQuery } from "../helpers/URL";

export async function getTrackers() {
  const res = await postWithAuth('/prescriptions/get/trackers', {
    medicine_id: getQuery('m'),
    prescription_id: getQuery('p')
  });

  return res.trackers;
}

async function getMedicine() {
  const res = await postWithAuth('/medicines/get/one', {
    id: getQuery('m'),
  });

  return res.medicine;
}

export default function PatientTrackers() {
  const [trackers, setTrackers] = useState([]);
  const [medicine, setMedicine] = useState(null) as any;

  useEffect(() => {
    (async () => {
      setTrackers(await getTrackers())
      setMedicine(await getMedicine())
    })();
  }, [])

  async function take (id: string) {
    const res = await postWithAuth('/prescriptions/trackers/take-pill', {
      id
    });

    setTrackers(await getTrackers())
  }

  return (
    <PatientMain page="trackers">
      <div className="container__main__title">
        <h4><i className="fa-regular fa-paste margin--right-1"></i><span>Tracker</span></h4>
        <p>Medicine tracker for <b>{medicine?.name}</b>, <b>{medicine?.dosage}</b></p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              trackers?.map((tracker_line: any) => (
                <tr key={tracker_line.id}>
                  <td>{tracker_line.id}</td>
                  <td>{tracker_line.is_taken ? 'Taken' : 'Not taken'}</td>
                  <td><span onClick={() => take(tracker_line.id)}>Take</span></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </PatientMain>
  )
}