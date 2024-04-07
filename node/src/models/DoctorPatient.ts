import { SQLifier } from "sqlifier"

export default new (class DoctorPatient extends SQLifier {
  constructor() {
    super();

    this.schema('doctor_patient', {
      id: { type: 'int', isAutoIncrement: true, isPrimary: true },
      doctor_id: { type: 'int' },
      patient_id: { type: 'int' },
      is_visible: { type: 'boolean', default: false }
    })
  }
})
