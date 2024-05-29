import Authenticator from "../Auth/Authenticator"
import PharmacistHeader from "../Components/Header/Pharmacist"
import PharmacistSidenav from "../Components/Sidenav/Pharmacist"

export default function PharmacistMain(props: any) {
  return (
    <Authenticator>
      <div className="container">
        <PharmacistSidenav page={props.page} />
        <div className="container__main">
          <PharmacistHeader />

          {props.children}
        </div>
      </div>
    </Authenticator>
  )
}