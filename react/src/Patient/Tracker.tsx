import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import PatientMain from "./Main"
import { getQuery } from "../helpers/URL";
import formatDate, { isPastDate, isToday } from "../helpers/date";
import { Link } from "react-router-dom";

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
    await postWithAuth('/prescriptions/trackers/take-pill', {
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
        <Link to={`/patient/prescriptions/medicines?p=${getQuery('p')}`}><h2 style={{ marginBottom: '1rem', fontSize: '1.6rem' }}>Go back</h2></Link>

        <table className="table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Status</th>
              <th>Take by</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              trackers?.map((tracker_line: any, index) => {
                
                return (<tr key={tracker_line.id} style={{ color: (isPastDate(new Date(tracker_line.take_by)) ? 'red' : 'inherit') }}>
                  <td>{index + 1}</td>
                  <td>{tracker_line.is_taken ? 'Taken' : 'Not taken'}</td>
                  <td>{formatDate(new Date(tracker_line.take_by))}</td>
                  <td>
                    { 
                      !isPastDate(new Date(tracker_line.take_by)) && !tracker_line.is_taken
                      ? (
                          isToday(new Date(tracker_line.take_by)) ? <span className="hover" onClick={() => take(tracker_line.id)}>Take</span> :
                            <span>To come</span>
                      ) : 
                      <span>Past</span>
                    }
                  </td>
                    
                </tr>)
              })
            }
          </tbody>
        </table>
      </div>
    </PatientMain>
  )
}