import { useEffect, useState } from "react";
import { downloadCSV, postWithAuth } from "../helpers/http";
import { formatTime } from "../helpers/date";
import { Link } from "react-router-dom";
import { getValueById } from "../helpers/dom";
import { closeModal, openModal } from "../helpers/modals";
import { showError } from "../helpers/error";
import PharmacyMain from "./Main"
import Driver from "../Components/Modal/Driver";

import "./Drivers.css"

export async function getDrivers() {
  const res = await postWithAuth('/drivers/get/by/pharmacy', {});

  return res.drivers;
}

export default function _ () {
  const [drivers, setDrivers] = useState([]) as any;

  const allowed = [
    'full_name', 'email'
  ]

  const header = [
    '#', 'Driver name', 'Email address'
  ]

  useEffect(() => {
    (async () => {
      setDrivers(await getDrivers())
    })();
  }, [])

  async function addDriver(e: any) {
    e.preventDefault();

    const res = await postWithAuth('/driver/register', {
      name: getValueById('driver-name'),
      email: getValueById('driver-email'),
    });

    if (res.successful) {
      setDrivers(await getDrivers())

      closeModal('new-driver');

      return;
    }

    showError('driver', res.error)
  }

  async function removeDriver(driver_id: string) {
    await postWithAuth('/drivers/remove/one', {
      driver_id
    });

    setDrivers(await getDrivers())
  }

  return (
    <PharmacyMain page="drivers">
      <div className="container__main__title">
        <h4><i className="fa-regular fa-paste margin--right-1"></i><span>Drivers</span></h4>
        <p>Pharmarcy drivers </p>
      </div>

      <div className="container__main__pad" style={{ marginTop: '4rem' }}>
        <button onClick={() => downloadCSV('Pharmacy Drivers', drivers, header, allowed)} className="btn btn--primary">Download CSV Report</button>

        <table className="table margin--top-2">
          <thead>
            <tr>
              <th>Full name</th>
              <th>Email address</th>
              <th>Added on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              drivers?.map((driver: any) => (
                <tr key={driver.id}>
                  <td>{driver.full_name}</td>
                  <td>{driver.email}</td>
                  <td>{formatTime(new Date(driver.date_created))}</td>
                  <td>
                    <span className="hover-del" onClick={() => removeDriver(driver.id)}>Remove</span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <a id="download-link" download></a>

        <p className="margin--top-2 hover" onClick={() => openModal('new-driver')}>
          <i className="fa-solid fa-plus margin--right-1"></i>
          <span>Add Driver</span>
        </p>
      </div>

      <Driver addDriver={addDriver} />
      
    </PharmacyMain>
  )
}