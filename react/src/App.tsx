import DoctorSignUp from "./Auth/DoctorSignUp"
import DoctorSignIn from "./Auth/DoctorSignIn"
import PatientSignIn from "./Auth/PatientSignIn"
import PatientPrescriptions from "./Patient/Prescriptions"
import PatientTracker from "./Patient/Tracker"
import PatientCollections from "./Patient/Collections"

import DoctorDiagnoses from "./Doctor/Diagnoses"
import DoctorCollections from "./Doctor/Collections"
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
        <Route path="/doctor/deliveries-collections" element={<DoctorCollections />}></Route>
        <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />}></Route>
        <Route path="/doctor/prescriptions/medicines" element={<DoctorPrescriptionMedicines />}></Route>
        <Route path="/doctor/patients" element={<DoctorPatients />}></Route>
        <Route path="/doctor/register" element={<DoctorSignUp />}></Route>
        <Route path="/doctor/login" element={<DoctorSignIn />}></Route>

        <Route path="/login" element={<PatientSignIn />}></Route>
        <Route path="/patient/deliveries-collections" element={<PatientCollections />}></Route>
        <Route path="/patient/prescriptions" element={<PatientPrescriptions />}></Route>
        <Route path="/patient/prescriptions/medicines" element={<PatientPrescriptionMedicines />}></Route>
        <Route path="/patient/prescriptions/medicines/tracker" element={<PatientTracker />}></Route>

      </Routes>
    </Router>
  )
}