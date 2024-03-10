import Authenticator from "../Auth/Authenticator"
import DoctorHeader from "../Components/Header/Doctor"
import DoctorSidenav from "../Components/Sidenav/Doctor"

export default function DoctorMain(props: any) {
  return (
    <Authenticator>
      <div className="container">
        <DoctorSidenav page={props.page} />
        <div className="container__main">
          <DoctorHeader />

          {props.children}
        </div>
      </div>
    </Authenticator>
  )
}