import { useContext } from "react"
import "./Header.css"
import { AuthContext } from "../../Auth/Authenticator"

export default function DoctorHeader() {
  const {user} = useContext(AuthContext);

  return (
    <header className="header flex flex--a-center flex--j-space-between">
      <div className="header__message">
        <p><b>Good day</b></p>
        <p>Dr {user.full_name}</p>
      </div>
      <div className="header__account">
        <p>Account</p>
      </div>
    </header>
  )
}