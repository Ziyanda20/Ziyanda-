import { Link, useNavigate } from "react-router-dom";
import "./Sidenav.css"
import { postWithAuth } from "../../helpers/http";

export default function _ (props: any) {
  const nav = useNavigate();

  const pageIs = (page: string) => {
    if (page == props.page) return 'sidenav__body__item--active'

    return ''
  }

  const logout = (e: any) => {
    (e as PointerEvent).preventDefault();

    postWithAuth('/logout', {}, true)

    nav('/driver/login');
  }

  return (
    <div className="sidenav">
      <div className="sidenav__header">
        <h1><span>MY</span>PHARMACIST</h1>
        <p>CARE FOR ALL</p>
      </div>
      <ul className="sidenav__body flex">
        <li>
          <Link to='/driver/deliveries' className={`sidenav__body__item ${pageIs('deliveries')} flex flex--a-center`}>
            <i className="fa-solid fa-truck-fast"></i>
            <span>Deliveries</span>
          </Link>
        </li>

        <li>
          <Link to='/driver/logout' className={`sidenav__body__item flex flex--a-center`} onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Log out</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}