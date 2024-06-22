import AdminSignUp from "./Auth/EmployeeSignUp"
import EmployeeSignIn from "./Auth/EmployeeSignIn"
import PatientSignIn from "./Auth/PatientSignIn"
import DriverSignIn from "./Auth/DriverSignIn"
import PharmacistSignUp from "./Auth/PharmacistSignUp"
import PharmacistSignIn from "./Auth/PharmacistSignIn"

import HospitalDoctors from "./Hospital/Doctors"
import HospitalPatients from "./Hospital/Patients"

import DoctorDiagnoses from "./Doctor/Diagnoses"
import DoctorPrescriptions from "./Doctor/Prescriptions"
import DoctorPrescriptionMedicines from "./Doctor/Medicines"

import PatientPrescriptionMedicines from "./Patient/Medicines"
import PatientPrescriptions from "./Patient/Prescriptions"
import PatientTracker from "./Patient/Tracker"
import PatientDeliveries from "./Patient/Deliveries"
import Address from "./Patient/Address"
import Profile from "./Patient/Profile"

import PharmacistDeliveries from "./Pharmacist/Deliveries"
import PharmacistPrescriptions from "./Pharmacist/Prescriptions"
import PharmacistPrescriptionsMedicines from "./Pharmacist/Medicines"
import PharmacistDrivers from "./Pharmacist/Drivers"

import DriverDeliveries from "./Driver/Deliveries"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hospital/doctors" element={<HospitalDoctors />}></Route>
        <Route path="/hospital/patients" element={<HospitalPatients />}></Route>

        <Route path="/doctor/diagnoses" element={<DoctorDiagnoses />}></Route>
        <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />}></Route>
        <Route path="/doctor/prescriptions/medicines" element={<DoctorPrescriptionMedicines />}></Route>

        <Route path="/hospital/register" element={<AdminSignUp />}></Route>
        <Route path="/employee/login" element={<EmployeeSignIn />}></Route>

        <Route path="/login" element={<PatientSignIn />}></Route>
        <Route path="/patient/profile" element={<Profile />}></Route>
        <Route path="/patient/address" element={<Address />}></Route>
        <Route path="/patient/deliveries" element={<PatientDeliveries/>}></Route>
        <Route path="/patient/prescriptions" element={<PatientPrescriptions />}></Route>
        <Route path="/patient/prescriptions/medicines" element={<PatientPrescriptionMedicines />}></Route>
        <Route path="/patient/prescriptions/medicines/tracker" element={<PatientTracker />}></Route>

        <Route path="/pharmacy/register" element={<PharmacistSignUp />}></Route>
        <Route path="/pharmacy/login" element={<PharmacistSignIn />}></Route>
        <Route path="/pharmacy/deliveries" element={<PharmacistDeliveries />}></Route>
        <Route path="/pharmacy/prescriptions" element={<PharmacistPrescriptions />}></Route>
        <Route path="/pharmacy/prescriptions/medicines" element={<PharmacistPrescriptionsMedicines />}></Route>
        <Route path="/pharmacy/drivers" element={<PharmacistDrivers />}></Route>

        <Route path="/driver/login" element={<DriverSignIn />}></Route>
        <Route path="/driver/deliveries" element={<DriverDeliveries />}></Route>
      </Routes>
    </Router>
  )
}