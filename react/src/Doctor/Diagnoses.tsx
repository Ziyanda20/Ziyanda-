import DoctorMain from "./Main"

export default function DoctorDiagnoses() {
  return (
    <DoctorMain page="diagnoses">
      <div className="container__main__title">
        <h4><i className="fa-solid fa-stethoscope margin--right-1"></i><span>Diagnoses</span></h4>
        <p>Manage your patients' diagnoses from here</p>
      </div>
    </DoctorMain>
  )
}