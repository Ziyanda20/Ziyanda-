import { useEffect, useState } from "react";
import { getUserBySession, postWithAuth, rememberUser } from "../helpers/http";
import PatientMain from "./Main"
import { getValueById } from "../helpers/dom";
import { Popup } from "../Components/Popup";


export default function _() {
  const [user, setUser] = useState(null) as any;
  const [popupMsg, setPopupMsg] = useState('');

  useEffect(() => {
    (async () => {
      const session = await getUserBySession();

      setUser(session)
    })();
  }, [])

  async function updateProfile(e: any) {
    e.preventDefault();

    let res = await postWithAuth('/patient/update/profile', {
      full_name: getValueById('full-name'),
    }, true);

    if (res.successful) {
      setPopupMsg('Profile updated successfully');

      rememberUser(res.user);

      setUser(res.user)
    }
  }

  async function updatePassword (e: any) {
    e.preventDefault();

    let res = await postWithAuth('/patient/update/password', {
      password_old: getValueById('password-old'),
      password: getValueById('password'),
      password_again: getValueById('password-again'),
    }, true);

    if (res.successful) {
      setPopupMsg('Password updated successfully');

      rememberUser(res.user);

      setUser(res.user)
    }
  }

  function clearPopup() {
    setPopupMsg('');
  }

  return (
    <PatientMain page="profile">
      <div className="container__main__title">
        <h4><i className="fa-solid fa-location-dot margin--right-1"></i><span>Profile</span></h4>
        <p>Keep you profile up to date.</p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <form onSubmit={updateProfile}>
          <div className="flex address">
            <div className="input">
              <input type="text" defaultValue={user?.id_number} disabled={true}/>
            </div>

            <div className="input">
              <input type="text" id="full-name" defaultValue={user?.full_name} placeholder="Full name" />
            </div>
          </div>
          
          <button className="btn btn--primary margin--top-2">Update profile</button>
        </form>

        <form className="margin--top-2" onSubmit={updatePassword}>
          <div className="flex address">
            <div className="input">
              <input type="password" id="password-old" placeholder="Old password" />
            </div>

            <div className="input">
              <input type="password" id="password" placeholder="Password" />
            </div>

            <div className="input">
              <input type="password" id="password-again" placeholder="Password again" />
            </div>
          </div>

          <button className="btn btn--primary margin--top-2">Update password</button>
        </form>
      </div>
      {popupMsg && (
        <Popup clearPopup={clearPopup}>
          {popupMsg}
        </Popup>
      )}
    </PatientMain>
  )
}