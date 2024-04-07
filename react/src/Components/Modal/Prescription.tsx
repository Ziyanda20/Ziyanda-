import { useEffect, useState } from "react";
import { closeModal } from "../../helpers/modals"

import "./Modal.css"
import { postWithAuth } from "../../helpers/http";

export default (props: any) => {
  const [diagnoses, setDiagnoses] = useState([]);

  async function getDiagnoses () {
    const res = await postWithAuth("/diagnoses/get/by/doctor", {})

    return res.diagnoses;
  }

  const [items, setItems] = useState([{
    name: '',
    dosage: '',
    days: 0
  }])

  function inputChangeHandler(index: number, event: any) {
    let data: Array<any> = [...items];
    data[index][event.target.name] = event.target.value;

    setItems(data);
  }

  const addMedicineItem = () => {
    let fields = {
      name: ' ',
      dosage: ' ',
      days: 0
    }

    setItems([...items, fields])
  }

  function removeMedicineItem (index: number) {
    let data = [...items];
    data.splice(index, 1)

    setItems(data)
  }

  function getMedicines () {
    const data: any = {};

    items.forEach((item, index) => {
      data[`name_${index}`] = item.name;
      data[`dosage_${index}`] = item.dosage;
      data[`days_${index}`] = item.days;
    });

    return data;
  }

  useEffect(() => {
    (async () => {
      setDiagnoses(await getDiagnoses())
    })()
  }, [])

  return (
    <div className="modal modal--closed" id="new-prescription-modal">
      <form className="modal__main" onSubmit={(e) => props.submitPrescription(e, getMedicines(), items.length)}>
        <div className="modal__main__header">
          <h4>Prescription</h4>
        </div>
        <div className="modal__main__body" style={{ margin: '1rem 0' }}>
          <div className="input">
            <label htmlFor="patient-name" className="margin--right-1"><b>Diagnosis And Patient</b></label>
            <select id="prescription-diagnosis">
              <option value="select" key={Math.random()}>-- Select --</option>
              {diagnoses.map((diagnosis: any) => (
                <option key={diagnosis.id} value={diagnosis.id}>{diagnosis.full_name} - {diagnosis.name}</option>
              ))}
            </select>
            
          </div>

          <p className="margin--top-2">Medicines</p>

          <div className="medicines" id="medicines-container">
            {items.map((item: any, index: number) => (
              <div className="medicines__item" key={index} id={`medicine-${index + 1}`}>
                <p className="margin--right-1"><b>Medicine {index + 1}:</b></p>
                <div className="flex">
                  <div className="input">
                    <input type="text" name="name" placeholder="Medicine" id={`medicine-${index + 1}-name`} value={item.name} onChange={(e) => inputChangeHandler(index, e)}/>
                  </div>
                  <div className="input">
                    <input type="text" name="dosage" placeholder="Dosage" id={`medicine-${index + 1}-dosage`} value={item.dosage} onChange={(e) => inputChangeHandler(index, e)} />
                  </div>
                  <div className="input">
                    <input type="text" name="days" placeholder="Days" id={`medicine-${index + 1}-days`} value={item.days} onChange={(e) => inputChangeHandler(index, e)} />
                  </div>
                  <i className="fa-solid fa-xmark" onClick={() => removeMedicineItem(index)}></i>
                </div>
              </div>
            )) }
          </div>
        </div>
        <div className="modal__main__footer flex flex--a-center">
          <button className="btn btn--primary margin--right-1">Add Prescription</button>
          <p className="margin--right-1 hover"onClick={addMedicineItem} >Add Medicine</p>
          <p className="hover" onClick={() => closeModal('new-prescription')}>Cancel</p>
        </div>
      </form>
    </div>
  )
}