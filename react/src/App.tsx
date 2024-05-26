import DoctorSignUp from "./Auth/DoctorSignUp"
import DoctorSignIn from "./Auth/DoctorSignIn"
import PatientSignIn from "./Auth/PatientSignIn"
import PatientPrescriptions from "./Patient/Prescriptions"
import PatientTracker from "./Patient/Tracker"
import PatientDeliveries from "./Patient/Deliveries"
import Address from "./Patient/Address"

import DoctorDiagnoses from "./Doctor/Diagnoses"
import DoctorDeliveries from "./Doctor/Deliveries"
import DoctorPrescriptions from "./Doctor/Prescriptions"
import DoctorPatients from "./Doctor/Patients"
import DoctorPrescriptionMedicines from "./Doctor/Medicines"
import PatientPrescriptionMedicines from "./Patient/Medicines"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/doctor/diagnoses" element={<DoctorDiagnoses />}></Route>
        <Route path="/doctor/deliveries" element={<DoctorDeliveries/>}></Route>
        <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />}></Route>
        <Route path="/doctor/prescriptions/medicines" element={<DoctorPrescriptionMedicines />}></Route>
        <Route path="/doctor/patients" element={<DoctorPatients />}></Route>
        <Route path="/doctor/register" element={<DoctorSignUp />}></Route>
        <Route path="/doctor/login" element={<DoctorSignIn />}></Route>

        <Route path="/login" element={<PatientSignIn />}></Route>
        <Route path="/patient/address" element={<Address />}></Route>
        <Route path="/patient/deliveries" element={<PatientDeliveries/>}></Route>
        <Route path="/patient/prescriptions" element={<PatientPrescriptions />}></Route>
        <Route path="/patient/prescriptions/medicines" element={<PatientPrescriptionMedicines />}></Route>
        <Route path="/patient/prescriptions/medicines/tracker" element={<PatientTracker />}></Route>

      </Routes>
    </Router>
  )
}