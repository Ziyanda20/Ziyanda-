import { closeModal } from "../../helpers/modals"

import "./Modal.css"

export default (props: any) => {
  return (
    <div className="modal modal--closed" id="new-doctor-modal">
      <form className="modal__main" onSubmit={props.addDoctor}>
        <div className="modal__main__header">
          <h4>Doctor</h4>
          <p>Add hospital doctor</p>
        </div>
        <div className="modal__main__body" style={{ margin: '1rem 0' }}>
          <p className="error hide" id="doctor-error"><b>Sorry</b></p>
          <div className="input flex flex--a-center">
            <label htmlFor="doctor-name" className="margin--right-1"><b>Full Name</b></label>
            <input type="text" id="doctor-name" placeholder="Full name" />
          </div>

          <div className="input flex flex--a-center">
            <label htmlFor="doctor-email" className="margin--right-1"><b>Email address</b></label>
            <input type="text" id="doctor-email" placeholder="Email address" />
          </div>
        </div>
        <div className="modal__main__footer flex flex--a-center">
          <button className="btn btn--primary margin--right-1">Add Doctor</button>
          <p className="hover" onClick={() => closeModal('new-doctor')}>Cancel</p>
        </div>
      </form>
    </div>
  )
}