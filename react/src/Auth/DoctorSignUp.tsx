import { useEffect, useState } from "react";
import { clearUser, postWithNoAuth } from "../helpers/http";
import { getValueById } from "../helpers/dom";
import { Link, useNavigate } from "react-router-dom";
import { id } from "../helpers/string";
import "./Auth.css"
import { showError } from "../helpers/error";

export default function DoctorSignUp() {
  const [auth, setAuth] = useState(null) as any;

  const nav = useNavigate();

  const registerDoctor = async (e: any) => {
    (e as PointerEvent).preventDefault();

    const res = await postWithNoAuth('/doctor/register', {
      fullname: getValueById('fullname'),
      email: id(getValueById('email')),
      password: getValueById('password'),
      passwordAgain: getValueById('password-again'),
    }, true)

    clearUser()

    setAuth(res.successful)

    showError('auth', res.error)
  }

  useEffect(() => {
    if (auth) nav('/doctor/prescriptions');
  }, [auth]);

  return (
    <div className="auth flex">
      <main className="auth__main">
        <form className="auth__main__form" onSubmit={registerDoctor}>
          <div className="auth__main__form__title">
            <h1><span>MY</span>PHARMACIST</h1>
            <p>CARE FOR ALL</p>
          </div>
          <div className="auth__main__form__body">
            <p className="error hide" id="auth-error">Erro</p>

            <div className="input">
              <input type="text" id="fullname" placeholder="Full name" />
            </div>
            <div className="input">
              <input type="email" id="email" placeholder="Email address" />
            </div>
            <div className="input">
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className="input">
              <input type="password" id="password-again" placeholder="Password again" />
            </div>

            <button className="btn btn--primary">Regiter now</button>

            <div className="auth__main__form__footer">
              <p>Have an account? <Link to="/doctor/login">Login</Link></p>
              {/* <p>Are you a patient? Login here</p> */}
            </div>
          </div>
        </form>
      </main>
      <div className="auth__back image--back" style={{ backgroundImage: 'url(/assets/backgrounds/im_1.jpg)' }}></div>
    </div>
  )
}