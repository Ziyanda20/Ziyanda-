import { Link, useNavigate } from "react-router-dom";
import "./Sidenav.css"
import { postWithAuth } from "../../helpers/http";

export default function DoctorSidenav(props: any) {
  const nav = useNavigate();

  const pageIs = (page: string) => {
    if (page == props.page) return 'sidenav__body__item--active'

    return ''
  }

  const logout = (e: any) => {
    (e as PointerEvent).preventDefault();

    postWithAuth('/logout', {}, true)

    nav('/doctor/login');
  }

  return (
    <div className="sidenav">
      <div className="sidenav__header">
        <h1><span>MY</span>PHARMACIST</h1>
        <p>CARE FOR ALL</p>
      </div>
      <ul className="sidenav__body flex">
        <li>
          <Link to='/doctor/diagnoses' className={`sidenav__body__item ${pageIs('diagnoses')} flex flex--a-center`}>
            <i className="fa-solid fa-stethoscope"></i>
            <span>Diagnoses</span>
          </Link>
        </li>
        <li>
          <Link to='/doctor/prescriptions' className={`sidenav__body__item ${pageIs('prescriptions')} flex flex--a-center`}>
            <i className="fa-regular fa-paste"></i>
            <span>Prescriptions</span>
          </Link>
        </li>

        <li>
          <Link to='/doctor/patients' className={`sidenav__body__item ${pageIs('patients')} flex flex--a-center`}>
            <i className="fa-solid fa-people-group"></i>
            <span>Patients</span>
          </Link>
        </li>

        <li>
          <Link to='/doctor/logout' className={`sidenav__body__item flex flex--a-center`} onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Log out</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}