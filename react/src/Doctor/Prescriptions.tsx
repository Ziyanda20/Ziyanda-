import DoctorMain from "./Main"

export default function DoctorPrescriptions() {
  return (
    <DoctorMain page="prescriptions">
      <div className="container__main__title">
        <h4><i className="fa-regular fa-paste margin--right-1"></i><span>Prescriptions</span></h4>
        <p>Manage your patients' prescriptions from here</p>
      </div>
    </DoctorMain>
  )
}