import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, postWithNoAuth } from "../helpers/http";
import { getValueById } from "../helpers/dom";
import { id } from "../helpers/string";
import "./Auth.css"
import { showError } from "../helpers/error";

export default function _() {
  const [auth, setAuth] = useState(null) as any;
  const [route, setRoute] = useState(null) as any;

  const nav = useNavigate();

  const loginDoctor = async (e: any) => {
    (e as PointerEvent).preventDefault();

    const res = await postWithNoAuth('/employee/login', {
      email: id(getValueById('email')),
      password: getValueById('password')
    }, true)

    clearUser()

    setAuth(res.successful)
    setRoute(res.route)

    showError('auth', res.error)
  }

  useEffect(() => {
    if (auth) nav(`${route}`);
  }, [auth]);

  return (
    <div className="auth flex">
      <main className="auth__main">
        <form className="auth__main__form" onSubmit={loginDoctor}>
          <div className="auth__main__form__title">
            <h1><span>MY</span>PHARMACIST</h1>
            <p>Hospital staff sign in</p>
          </div>
          <div className="auth__main__form__body">
            <p className="error hide" id="auth-error">Erro</p>
            <div className="input">
              <input type="email" id="email" placeholder="Email address" />
            </div>
            <div className="input">
              <input type="password" id="password" placeholder="Password" />
            </div>
            <button className="btn btn--primary">Login</button>

            <div className="auth__main__form__footer">
              <p>Don't have an account? <Link to="/doctor/register">Register</Link></p>
              {/* <p>Are you a patient? Login here</p> */}
            </div>
          </div>
        </form>
      </main>
      <div className="auth__back image--back" style={{ backgroundImage: 'url(/assets/backgrounds/im_1.jpg)' }}></div>
    </div>
  )
}