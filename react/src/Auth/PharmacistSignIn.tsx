import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearUser, postWithNoAuth } from "../helpers/http";
import { getValueById } from "../helpers/dom";
import { id } from "../helpers/string";
import { showError } from "../helpers/error";
import "./Auth.css"

export default function DoctorSignIn() {
  const [auth, setAuth] = useState(null) as any;

  const nav = useNavigate();

  const loginPharmacist = async (e: any) => {
    (e as PointerEvent).preventDefault();

    const res = await postWithNoAuth('/pharmacist/login', {
      email: id(getValueById('email-address')),
      password: getValueById('password')
    }, true)

    clearUser()

    setAuth(res.successful)

    showError('auth', res.error)
  }

  useEffect(() => {
    if (auth) nav('/pharmacy/prescriptions');
  }, [auth]);

  return (
    <div className="auth flex">
      <main className="auth__main">
        <form className="auth__main__form" onSubmit={loginPharmacist}>
          <div className="auth__main__form__title">
            <h1><span>MY</span>PHARMACIST</h1>
            <p>Pharmacist sign in</p>
          </div>
          <div className="auth__main__form__body">
            <p className="error hide" id="auth-error">Erro</p>
            <div className="input">
              <input type="email" id="email-address" placeholder="Email address" />
            </div>
            <div className="input">
              <input type="password" id="password" placeholder="Password" />
            </div>
            <button className="btn btn--primary">Login</button>
          </div>
        </form>
      </main>
      <div className="auth__back image--back" style={{ backgroundImage: 'url(/assets/backgrounds/im_1.jpg)' }}></div>
    </div>
  )
}