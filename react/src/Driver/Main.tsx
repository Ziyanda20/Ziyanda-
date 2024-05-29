import Authenticator from "../Auth/Authenticator"
import DriverHeader from "../Components/Header/Driver"
import DriverSidenav from "../Components/Sidenav/Driver"

export default function _ (props: any) {
  return (
    <Authenticator>
      <div className="container">
        <DriverSidenav page={props.page} />
        <div className="container__main">
          <DriverHeader />

          {props.children}
        </div>
      </div>
    </Authenticator>
  )
}