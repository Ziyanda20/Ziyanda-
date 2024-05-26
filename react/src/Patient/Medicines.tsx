import { useEffect, useState } from "react";
import PatientMain from "./Main"

import { postWithAuth } from "../helpers/http";
import { getQuery } from "../helpers/URL";
import { Link } from "react-router-dom";


export default function PatientPrescriptionMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [prescription, setPrescription] = useState(null) as any;

  async function getMedicines() {
    const res = await postWithAuth('/medicines/get/by/prescription', {
      prescription_id: getQuery('p')
    })

    return res.medicines;
  }

  async function getPrescription() {
    const res = await postWithAuth('/prescriptions/get/one', {
      prescription_id: getQuery('p')
    })

    return res.prescription;
  }

  useEffect(() => {
    (async () => {
      setMedicines(await getMedicines())
      setPrescription(await getPrescription())
    })()
  }, [])

  return (
    <PatientMain page="medicines">
      <div className="container__main__title">
        <h4><i className="fa-regular fa-paste margin--right-1"></i><span>Medicines</span></h4>
        {prescription && <p dangerouslySetInnerHTML={{ __html: `This is medication for <b>${prescription?.full_name}</b> for <b>${prescription?.name}</b>` }}></p>}

      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <Link to={`/patient/prescriptions`}><h2 style={{ marginBottom: '1rem', fontSize: '1.6rem' }}>Go back</h2></Link>

        <table className="table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Doses left</th>
              <th>Days</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {medicines?.map((medicine: any) => (
              <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.dosage}</td>
                <td>{medicine.frequency}</td>
                <td>{medicine.dosage_left}</td>
                <td>{medicine.days}</td>
                <td><Link to={`/patient/prescriptions/medicines/tracker?p=${medicine.prescription_id}&m=${medicine.id}`}>Open tracker</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </PatientMain>
  )
}