import { useEffect, useState } from "react";
import DoctorMain from "./Main"

import { postWithAuth } from "../helpers/http";
import { getQuery } from "../helpers/URL";


export default function DoctorPrescriptionMedicines() {
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
    <DoctorMain page="medicines">
      <div className="container__main__title">
        <h4><i className="fa-regular fa-paste margin--right-1"></i><span>Medicines</span></h4>
        {prescription && <p dangerouslySetInnerHTML={{ __html: `This is medication for <b>${prescription?.full_name}</b> for <b>${prescription?.name}</b>` }}></p>}

      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Days</th>
            </tr>
          </thead>

          <tbody>
            {medicines?.map((medicine: any) => (
              <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.dosage}</td>
                <td>{medicine.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </DoctorMain>
  )
}