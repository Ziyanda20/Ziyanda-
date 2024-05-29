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

    nav('/pharmacy/login');
  }

  return (
    <div className="sidenav">
      <div className="sidenav__header">
        <h1><span>MY</span>PHARMACIST</h1>
        <p>CARE FOR ALL</p>
      </div>
      <ul className="sidenav__body flex">
        <li>
          <Link to='/pharmacy/prescriptions' className={`sidenav__body__item ${pageIs('prescriptions')} flex flex--a-center`}>
            <i className="fa-regular fa-paste"></i>
            <span>Prescriptions</span>
          </Link>
        </li>

        <li>
          <Link to='/pharmacy/drivers' className={`sidenav__body__item ${pageIs('drivers')} flex flex--a-center`}>
            <i className="fa-solid fa-people-group"></i>
            <span>Drivers</span>
          </Link>
        </li>

        <li>
          <Link to='/pharmacy/deliveries' className={`sidenav__body__item ${pageIs('deliveries')} flex flex--a-center`}>
            <i className="fa-solid fa-truck-fast"></i>
            <span>Deliveries</span>
          </Link>
        </li>

        <li>
          <Link to='/pharmacy/logout' className={`sidenav__body__item flex flex--a-center`} onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Log out</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}