import DoctorSignUp from "./Auth/DoctorSignUp"
import DoctorSignIn from "./Auth/DoctorSignIn"

import DoctorDiagnoses from "./Doctor/Diagnoses"
import DoctorPrescriptions from "./Doctor/Prescriptions"
import DoctorPatients from "./Doctor/Patients"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/doctor/diagnoses" element={<DoctorDiagnoses />}></Route>
        <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />}></Route>
        <Route path="/doctor/patients" element={<DoctorPatients />}></Route>
        <Route path="/doctor/register" element={<DoctorSignUp />}></Route>
        <Route path="/doctor/login" element={<DoctorSignIn />}></Route>
      </Routes>
    </Router>
  )
}