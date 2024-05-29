import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, postWithNoAuth } from "../helpers/http";
import { getValueById } from "../helpers/dom";
import { id } from "../helpers/string";
import { showError } from "../helpers/error";
import "./Auth.css"

export default function _ () {
  const [auth, setAuth] = useState(null) as any;

  const nav = useNavigate();

  const loginDriver = async (e: any) => {
    (e as PointerEvent).preventDefault();

    const res = await postWithNoAuth('/driver/login', {
      email: id(getValueById('email-address')),
      password: getValueById('password')
    }, true)

    clearUser()

    setAuth(res.successful)

    showError('auth', res.error)
  }

  useEffect(() => {
    if (auth) nav('/driver/deliveries');
  }, [auth]);

  return (
    <div className="auth flex">
      <main className="auth__main">
        <form className="auth__main__form" onSubmit={loginDriver}>
          <div className="auth__main__form__title">
            <h1><span>MY</span>PHARMACIST</h1>
            <p>Driver sign in</p>
          </div>
          <div className="auth__main__form__body">
            <p className="error hide" id="auth-error">Erro</p>
            <div className="input">
              <input type="text" id="email-address" placeholder="Email address" />
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