import { closeModal } from "../../helpers/modals"

import "./Modal.css"

export default (props: any) => {
  return (
    <div className="modal modal--closed" id="new-diagnoses-modal">
      <form className="modal__main" onSubmit={props.addDiagnoses}>
        <div className="modal__main__header">
          <h4>Diagnosis</h4>
        </div>
        <div className="modal__main__body" style={{ margin: '1rem 0' }}>
          <div className="input flex flex--a-center">
            <label htmlFor="diagnoses-name" style={{ width: '15rem' }} className="margin--right-1"><b>Diagnoses</b></label>
            <input type="text" id="diagnoses-name" placeholder="e.g. Lung Cancer" />
          </div>

          <div className="input flex flex--a-center margin--top-1">
            <label htmlFor="diagnoses-patient" style={{ width: '15rem' }} className="margin--right-1"><b>Patient</b></label>

            <select id="diagnoses-patient">
              <option value="select" key={Math.random()}>-- Select --</option>

              {props.patients?.map((patient: any) => (<option key={patient.id} value={patient.id}>{patient.full_name}</option>))}
            </select>
          </div>
        </div>
        <div className="modal__main__footer flex flex--a-center">
          <button className="btn btn--primary margin--right-1">Add Diagnosis</button>
          <p className="hover" onClick={() => closeModal('new-diagnoses')}>Cancel</p>
        </div>
      </form>
    </div>
  )
}