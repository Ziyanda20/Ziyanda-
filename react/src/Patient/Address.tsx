import { useEffect, useState } from "react";
import { getUserBySession, postWithAuth, rememberUser } from "../helpers/http";
import PatientMain from "./Main"
import { getValueById } from "../helpers/dom";
import { Popup } from "../Components/Popup";

export default function _() {
  const [address, setAddress] = useState(null) as any;
  const [popupMsg, setPopupMsg] = useState('');

  const getAddr = (user: any) => {
    return {
      addr_line_1: user.addr_line_1,
      addr_line_2: user.addr_line_2,
      province: user.province
    }
  }

  useEffect(() => {
    (async () => {
      const session = await getUserBySession();

      setAddress(getAddr(session))
    })();
  }, [])

  async function updateAddress(e: any) {
    e.preventDefault();

    let res = await postWithAuth('/patient/update/address', {
      line_1: getValueById('line-1'),
      line_2: getValueById('line-2'),
      province: getValueById('province')
    }, true);

    
    if (res.successful) {
      rememberUser(res.user);
      setPopupMsg('Address updated successfully');
      setAddress(getAddr(res.user))
    }
  }

  function clearPopup() {
    setPopupMsg('');
  }

  return (
    <PatientMain page="address">
      <div className="container__main__title">
        <h4><i className="fa-solid fa-location-dot margin--right-1"></i><span>Address</span></h4>
        <p>Keep you address up to date.</p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <form onSubmit={updateAddress}>
          <div className="flex address">
            <div className="input">
              <input type="text" id="line-1" defaultValue={address?.addr_line_1} placeholder="Street" />
            </div>
            <div className="input">
              <input type="text" id="line-2" defaultValue={address?.addr_line_2} placeholder="Line 2" />
            </div>
            <div className="input">
              <input type="text" id="province" defaultValue={address?.province} placeholder="Province" />
            </div>
          </div>
          
          <button className="btn btn--primary margin--top-2">Update address</button>
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