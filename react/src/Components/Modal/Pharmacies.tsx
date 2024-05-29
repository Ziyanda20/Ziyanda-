import { closeModal } from "../../helpers/modals"

import "./Modal.css"

export default (props: any) => {
  return (
    <div className={`modal modal--closed`} id="select-pharmacy-modal">
      <form className="modal__main">
        <div className="modal__main__header">
          <h4>Pharmacies</h4>
          <p>Select a pharmacy</p>
        </div>
        <div className="modal__main__body" style={{ margin: '1rem 0' }}>
          <p className="error hide" id="diagnosis-error"><b>Sorry</b></p>

          {props.pharmacies.map((pharmacy: any) => (
            <p className="hover margin--top-1" key={pharmacy.id} onClick={() => props.assignPharmacy(pharmacy.id)}>{pharmacy.name} (Select)</p>
          ))}
        </div>
        <div className="modal__main__footer flex flex--a-center">
          <p className="hover" onClick={() => closeModal('select-pharmacy')}>Cancel</p>
        </div>
      </form>
    </div>
  )
}