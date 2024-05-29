import Authenticator from "../Auth/Authenticator"
import AdminHeader from "../Components/Header/Doctor"
import AdminSidenav from "../Components/Sidenav/Admin"

export default function AdminMain(props: any) {
  return (
    <Authenticator>
      <div className="container">
        <AdminSidenav page={props.page} />
        <div className="container__main">
          <AdminHeader />

          {props.children}
        </div>
      </div>
    </Authenticator>
  )
}