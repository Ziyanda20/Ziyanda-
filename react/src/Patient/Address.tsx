import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import PatientMain from "./Main"
import { getValueById } from "../helpers/dom";

export default function _() {
  async function setAddress(e: any) {
    e.preventDefault();

    await postWithAuth('/patients/update/address', {
      line_1: getValueById('line-1'),
      line_2: getValueById('line-2'),
      province: getValueById('province')
    });
  }

  return (
    <PatientMain page="address">
      <div className="container__main__title">
        <h4><i className="fa-solid fa-location-dot margin--right-1"></i><span>Address</span></h4>
        <p>Keep you address up to date.</p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <form onSubmit={setAddress}>
          <div className="flex address">
            <div className="input">
              <input type="text" id="line-1" placeholder="Street" />
            </div>
            <div className="input">
              <input type="text" id="line-2" placeholder="Line 2" />
            </div>
            <div className="input">
              <input type="text" id="province" placeholder="Province" />
            </div>
          </div>
          
          <button className="btn btn--primary margin--top-2">Update address</button>
        </form>
      </div>
    </PatientMain>
  )
}