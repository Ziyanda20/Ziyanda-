import DoctorMain from "./Main"

export default function DoctorPatients() {
  return (
    <DoctorMain page="patients">
      <div className="container__main__title">
        <h4><i className="fa-regular fa-paste margin--right-1"></i><span>Patients</span></h4>
        <p>Manage your patients from here</p>
      </div>
    </DoctorMain>
  )
}