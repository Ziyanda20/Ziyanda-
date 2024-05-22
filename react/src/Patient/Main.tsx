import Authenticator from "../Auth/Authenticator"
import PatientHeader from "../Components/Header/Patient"
import PatientSidenav from "../Components/Sidenav/Patient"

export default function PatientMain(props: any) {
  return (
    <Authenticator>
      <div className="container">
        <PatientSidenav page={props.page} />
        <div className="container__main">
          <PatientHeader />

          {props.children}
        </div>
      </div>
    </Authenticator>
  )
}