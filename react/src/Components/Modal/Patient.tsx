import { closeModal } from "../../helpers/modals"

import "./Modal.css"

export default (props: any) => {
  return (
    <div className="modal modal--closed" id="new-patient-modal">
      <form className="modal__main" onSubmit={props.addPatient}>
        <div className="modal__main__header">
          <h4>Patient</h4>
        </div>
        <div className="modal__main__body" style={{ margin: '1rem 0' }}>
          <p className="error hide" id="patient-error"><b>Sorry</b></p>
          <div className="input flex flex--a-center">
            <label htmlFor="patient-name" className="margin--right-1"><b>Patient Full Name</b></label>
            <input type="text" id="patient-name" placeholder="Patient full name" />
          </div>

          <div className="input flex flex--a-center">
            <label htmlFor="patient-id" className="margin--right-1"><b>Patient ID Number</b></label>
            <input type="text" id="patient-id" placeholder="Patient ID Number" />
          </div>

          <div className="input flex flex--a-center">
            <label htmlFor="patient-email" className="margin--right-1"><b>Patient email address</b></label>
            <input type="email" id="patient-email" placeholder="Patient email address" />
          </div>
        </div>
        <div className="modal__main__footer flex flex--a-center">
          <button className="btn btn--primary margin--right-1">Add Patient</button>
          <p className="hover" onClick={() => closeModal('new-patient')}>Cancel</p>
        </div>
      </form>
    </div>
  )
}